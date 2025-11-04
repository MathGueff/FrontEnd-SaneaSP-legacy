export interface IFeedback {
    id: number,
    data_publicacao: Date,
    descricao: string,
    fk_funcionario: number,
    fk_denuncia: number,
    fk_cidadao: number
}

export interface ICreateFeedback {
    data_publicacao: Date,
    descricao: string,
    fk_funcionario: number,
    fk_denuncia: number,
    fk_cidadao: number
}