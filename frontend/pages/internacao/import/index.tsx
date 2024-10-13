import React, {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { Button } from 'primereact/button';
import { NOTIFICATION_TYPES, useNotification } from '../../../context/NotificationProvider';
import { useLoading } from '../../../context/LoadingProvider';
import * as XLSX from 'xlsx';
import {DataReponseCenso, ICenso} from "../../../types/censo/interface";
import {CensoImportFrontService} from "../../../services/censo/importacao.front.service";
import TableCenso from "../../../components/Table/table";


function isEmpty(obj): obj is ICenso  {
    const requiredKeys = ["nome", "nascimento", "codigo", "entrada"];

    return obj && requiredKeys.every(key => key in obj) && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function jsonToArray(json) {
    const data: any[] = JSON.parse(json);
    const headers = {};
    const result = [];

    for (const [cell, content] of Object.entries(data)) {
        if (cell.endsWith('1')) {
            headers[cell[0]] = content.v;
        }
    }

    for (const [cell, content] of Object.entries(data)) {
        const match = cell.match(/^([A-Z])(\d+)$/); // Exemplo: A2, B3, etc.
        if (match) {
            const [_, col, row] = match; // Extrai a coluna e a linha
            const rowNumber = Number(row)
            if (rowNumber > 1) {
                if (!result[rowNumber - 2]) result[rowNumber - 2] = {};
                const value = content.w ?? content.v ?? null;

                result[rowNumber - 2][headers[col]] = value;
            }
        }
    }

    return result;
}

export default function ImportCenso() {
    const [users, setUsers] = useState<any[]>([]);
    const [dataExcel, setDataExcel] = useState<Array<ICenso>>([]);
    const [dataSelectExcel, setSelectDataExcel] = useState<Array<ICenso>>([]);
    const [dataResponse, setResponse] = useState<DataReponseCenso | undefined>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setLoading } = useLoading();
    const { addToast } = useNotification();

    const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    const readExcelFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target?.result as string;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            // Pegando a primeira planilha e convertendo para JSON
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData: ICenso[] = jsonToArray(JSON.stringify(sheet));

            console.log("json convertido", jsonData)

            setDataExcel(jsonData.map((censo, index) => {
                return {...censo, id: index, verified: false}
            }));
        };
        reader.readAsBinaryString(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (file) {
            const fileType = file.type;

            if (allowedTypes.length && !allowedTypes.includes(fileType)) {
                setError(`Formato não suportado. Permitidos: ${allowedTypes.join(', ')}`);
                setSelectedFile(null);
            } else {
                setSelectedFile(file);
                setError(null);
                readExcelFile(file);
            }
        }
    };

    function verifyRows(){

        let return_var = false

        dataSelectExcel.forEach((item) => {
            if(!item.verified){
                addToast("Aviso!", "Você não verificou todos os censos", "warn")
                return_var = true;
            }
        })

        return return_var;
    }

    function cleanPage(){
        setSelectedFile(null)
        setDataExcel([])
        setSelectDataExcel([])
    }

    async function saveImport(){

        if(dataSelectExcel.length === 0 || verifyRows()) return;
        setLoading(true)
        await CensoImportFrontService.handle(dataSelectExcel).then((response) => {
            addToast("Sucesso", "Importação realizada com sucesso", "success")

            const data: DataReponseCenso = response.data.data

            setResponse(data)
            cleanPage()

        }).catch((error) => {
            console.log(error);
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        console.log("response", dataResponse)
        if(typeof dataResponse !== 'undefined' && dataResponse.error.length > 0) {
            let __data = []

            dataResponse.error.map((censoErro) => {
                console.log("percorrendo erros", censoErro);
                __data.push({...censoErro.data, message: censoErro.type_error})
            })
            __data.length > 0 && setDataExcel(__data)
            __data.length > 0 && addToast("Aviso!", "Existe alguns que deram erro, verifique na tabela", "error")

            console.log("verificando se existe erro", __data)
        }

    }, [dataResponse]);


    return (
        <Layout>
            <div className="p-10 overflow-x-auto overflow-y-auto max-w-full">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold py-2 px-4 text-black mb-0">
                        Importação de censo
                    </h1>


                    <a target="_blank" href={"https://docs.google.com/spreadsheets/d/1PexlvzegNCuvD5Kgefexed8POAJi6CFs1R5_YRG7Gnk/edit?gid=2012589636#gid=2012589636"}>
                    <Button className="bg-blue-500 text-white p-2" severity="info">
                        Baixar Excel de exemplo
                    </Button>
                    </a>
                </div>

                <div className={"card p-4 shadow rounded-lg mt-10 overflow-x-auto overflow-y-auto max-w-full"}>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />

                    {selectedFile && (
                        <p className="text-green-600">Arquivo selecionado: {selectedFile.name}</p>
                    )}
                    {error && <p className="text-red-600">{error}</p>}

                    {(typeof dataResponse !== 'undefined' && dataResponse.error.length > 0) &&
                      <h2 className={"text-xl font-semibold py-2 px-4 text-red-500 mt-10"}> Salvamos quase todos, abaxio os que deram erro: </h2>}


                    {dataExcel.length > 0 && (
                        <div className="card overflow-x-auto overflow-y-auto max-w-full">
                            <TableCenso dataSelectExcel={dataSelectExcel}
                                        dataExcel={dataExcel}
                                        setDataExcel={setDataExcel}
                                        setSelectDataExcel={setSelectDataExcel}
                                        saveImport={saveImport}
                            />
                        </div>
                    )}

                </div>

            </div>
        </Layout>
    );
}
