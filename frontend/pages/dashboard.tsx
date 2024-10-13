import React, { useEffect, useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRouter } from 'next/router'; 

import { LoadingContext } from '../context/LoadingProvider';
import Layout from '../components/Layout';
import { Button } from 'primereact/button';
import { FrontEndRoutes } from '../config/front-end-routes';
import { useAuth } from '../context/AuthContext';
import {addLocale, locale} from "primereact/api";
import {ptBr} from "../variables/translate";
import {ICenso} from "../types/censo/interface";
import {ListInternacaoFrontService} from "../services/internacao/list.front.service";
import {Paciente} from "../types/internacao/interface";

export default function Dashboard() {
    addLocale('pt', ptBr);
    locale('pt');

    const { userData } = useAuth();
    const router = useRouter();
    const { hasAccess } = useAuth();
    const { setLoading, isLoading } = useContext(LoadingContext);
    const [data, setData] = useState<Paciente[]>([]);
    const [expandedRows, setExpandedRows] = useState<Paciente[]>([]);

    async function getList(){

        setLoading(true)
        await ListInternacaoFrontService.handle().then((response) => {
            const data: Paciente[] = response.data.data

            setData(data)
        }).catch((error) => {
            console.log(error);
        }).finally(() => setLoading(false))
    }

    const internacaoTemplate = (rowData: Paciente) => {
        return (
            <DataTable value={Object.values(rowData.internacoes)}>
                <Column field="codigo" header="Código de internação"></Column>
                <Column field="entrada" header="Entrada"></Column>
                <Column field="saida" header="Saida"></Column>
            </DataTable>
        );
    };


    useEffect(() => {
        getList()
    }, []);

    return (
        <Layout>
            <div className="min-h-screen p-10 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl text-black">Dashboard - Internações</h1>

                    <Button
                        onClick={() => router.push(FrontEndRoutes.CENSO.IMPORT.route)}
                        severity={"info"}
                        className={"bg-blue-500 text-white p-2"}
                        label="Importar Censo" icon="pi pi-plus" iconPos="left" />
                </div>

                <div className="card shadow p-4 rounded-lg">
                    <DataTable
                        value={data}
                        paginator
                        rows={5}
                        filterDisplay="row"
                        rowExpansionTemplate={internacaoTemplate}
                        expandedRows={expandedRows}
                        onRowToggle={(e: any) => setExpandedRows(e.data)}
                    >
                        <Column expander style={{ width: '3em' }} />
                        <Column field="nome" header="Nome" filter />
                        <Column
                            field="nascimento"
                            header="Nascimento"
                            sortable
                            // body={(rowData) => formatCurrency(rowData.total_sales)}
                        />
                        <Column
                            field="codigo"
                            header="Código do Paciente"
                            sortable
                            // body={(rowData) => formatCurrency(rowData.commission_amount)}
                        />
                        {/*<Column*/}
                        {/*    field="guia"*/}
                        {/*    header="Código de internação"*/}
                        {/*    sortable*/}
                        {/*    // body={(rowData) => formatCurrency(rowData.commission_amount)}*/}
                        {/*/>*/}
                        {/*<Column*/}
                        {/*    field="entrada"*/}
                        {/*    header="Data de entrada"*/}
                        {/*    sortable*/}
                        {/*    // body={(rowData) =>*/}
                        {/*    //     `${(parseFloat(rowData.commission_percentage)).toFixed(2)}%`*/}
                        {/*    // }*/}
                        {/*/>*/}
                        {/*<Column*/}
                        {/*    field="saida"*/}
                        {/*    header="Data de alta"*/}
                        {/*    sortable*/}
                        {/*    // body={(rowData) =>*/}
                        {/*    //     `${(parseFloat(rowData.commission_percentage)).toFixed(2)}%`*/}
                        {/*    // }*/}
                        {/*/>*/}
                    </DataTable>
                </div>
            </div>
        </Layout>
    );
}
