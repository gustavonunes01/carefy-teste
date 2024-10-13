export interface InternacaoResponse {
    data: Paciente[]
}

export interface Paciente {
    id: number
    nome: string
    email: any
    nascimento: string
    codigo: string
    created_at: string
    updated_at: string
    deleted_at: any
    internacoes: Internacao[]
}

export interface Internacao {
    id: number
    id_paciente: number
    codigo: string
    entrada: string
    saida: string
    created_at: string
    updated_at: string
    deleted_at: any
}
