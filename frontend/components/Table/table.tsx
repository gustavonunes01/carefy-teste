import {Column, ColumnBodyOptions} from "primereact/column";
import {DataTable} from "primereact/datatable";
import React from "react";
import {InputText} from "primereact/inputtext";
import {ICenso} from "../../types/censo/interface";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import {Tooltip} from "primereact/tooltip";


interface TableProps{
    dataExcel: Array<ICenso>,
    setDataExcel: any,
    dataSelectExcel: Array<ICenso>,
    setSelectDataExcel: any,
    saveImport: () => void
}

// Array com os códigos e suas mensagens formatadas
const messages = {
    EXIST_GUIA_DIFF: "Já existe uma internação com essa guia",
    EXIST_GUIA_SAME: "Está cadastrando a mesma internação",
    EMPTY: "Não pode enviar sem informação de cadastro",
    EXIST_INTERN_NOT_LEAVE: "Paciente já tem uma internação atualmente.",
    INTERN_DATA_ENTRY_ERRO: "Data de entrada é menor que a data de nascimento do paciente",
    INTERN_DATA_EXIT_ERRO: "Data de saída é menor que a data de entrada"
};

// Função para retornar a mensagem formatada com base no tipo
function getMessage(type) {
    return messages[type] || "Código de mensagem não encontrado";
}

const TableCenso = ({dataExcel, setSelectDataExcel, setDataExcel, dataSelectExcel, saveImport} : TableProps) => {

    const onRowEditComplete = (e) => {
        let _products = [...dataExcel];
        const data = e.newData
        const editData = _products.map((censo) => {
            if(censo.id === data.id){
                return {...data, verified: true}
            }

            return censo
        });

        setDataExcel(editData);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const verifiedBodyTemplate = (rowData: ICenso) => {
        return <>
            <Tooltip target=".custom-target-icon" />
            <i data-pr-tooltip={rowData?.message ? getMessage(rowData?.message) : "Verificar"}
               data-pr-position="right"
               data-pr-at="right+5 top"
               data-pr-my="left center-2"
                className={classNames('custom-target-icon pi', {
                'true-icon pi-check-circle text-green-500': rowData.verified,
                'false-icon pi-times-circle text-red-500': !rowData.verified
            })}></i>
        </>;
    };

    const renderHeader = () => {
        return (
            <div className="flex w-full justify-content-end">
                <Button disabled={(dataSelectExcel.length === 0)}
                        onClick={() => saveImport()}
                        className="bg-blue-500 text-white p-2" severity="info">
                    Salvar censo
                </Button>
            </div>
        );
    };

    const onClickChecked = (censo: ICenso) => {
        let _products = [...dataExcel];
        let _selected = [...dataSelectExcel];
        const data = censo
        const editData = _products.map((censo) => {
            if(censo.id === data.id){
                return {...data, verified: true}
            }

            return censo
        });

        const editDataSele = _selected.map((censo) => {
            if(censo.id === data.id){
                return {...data, verified: true}
            }

            return censo
        });

        setDataExcel(editData);
        setSelectDataExcel(editDataSele);
    };

    const onClickDelete = (censo: ICenso) => {
        let _products = [...dataExcel];
        let _selected = [...dataSelectExcel];

        const editData = _products.filter((s, index) => (typeof s !== undefined && s.id !== censo.id))
        const editSelectData = _selected.filter((s, index) => (typeof s !== undefined && s.id !== censo.id))

        setDataExcel(editData);
        setSelectDataExcel(editSelectData);
    };

    function btnDeleteBody(obj:ICenso, column: ColumnBodyOptions){
        return (
            <div className={"grid grid-cols-2 gap-0"}>
                <Button className="text-green-500" onClick={() => onClickChecked(obj)}>
                    <i className={"pi pi-check"}></i>
                </Button>
                <Button className="text-red-500" onClick={() => onClickDelete(obj)}>
                    <i className={"pi pi-times"}></i>
                </Button>
            </div>
        )
    }

    return <DataTable header={renderHeader}
                      value={dataExcel} selectionMode={'checkbox'}
                      selection={dataSelectExcel}
                      onSelectionChange={(e) => setSelectDataExcel(e.value)}
                      dataKey="id"
                      tableStyle={{minWidth: '50rem'}}
                      paginator
                      rows={10}
                      editMode="row"
                      onRowEditComplete={onRowEditComplete}
    >
        <Column selectionMode="multiple" headerStyle={{maxWidth: '1rem'}} />
        <Column field="verified" header="Verificação" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} />
        <Column field="nome" editor={(options) => textEditor(options)} header="Nome"></Column>
        <Column field="nascimento" editor={(options) => textEditor(options)} header="Nascimento"></Column>
        <Column field="codigo" editor={(options) => textEditor(options)} header="Código Paciente"></Column>
        <Column field="guia" editor={(options) => textEditor(options)} header="Código Internação"></Column>
        <Column field="entrada" editor={(options) => textEditor(options)} header="Entrada"></Column>
        <Column field="saida" editor={(options) => textEditor(options)} header="Saida"></Column>
        <Column body={btnDeleteBody} headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}></Column>
        <Column rowEditor={true} headerStyle={{ width: '1%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
    </DataTable>

}

export default TableCenso