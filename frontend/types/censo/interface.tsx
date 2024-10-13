

export interface ICenso {
    id?: string | number
    nome: string,
    nascimento: string,
    codigo: string,
    entrada: string,
    saida: string
    verified?: boolean
    message?: string
}

export type CensoReponse = { data: ICenso[] }

export type DataCensoReponse = ICenso[]


export interface ReturnReponseCenso {
    data: DataReponseCenso
}

export interface DataReponseCenso {
    message: string
    error: Error[]
}

export interface Error {
    type_error: string
    data: CensoRow
}

export interface CensoRow {
    nome: string
    nascimento: string
    codigo: string
    guia: string
    entrada: string
    saida: string
    id: number
    verified: boolean
}
