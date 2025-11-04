import { IEndereco } from "@shared/models/endereco.model";
/*
    Campos com ?. são opcionais, podem não ser informados nos inputs
    Endereco agrupa logradouro, cidade, bairro, numero e cep no mesmo campo
*/

export interface IUser {
    id: number,
    nome: string,
    senha: string,
    email: string,
    telefone?: string,
    cpf?: string,
    endereco?: IEndereco,
    nivel?: number,
    verified: boolean
}

export interface ICreateUser{
    nome: string,
    senha: string,
    email: string,
    telefone?: string,
    cpf?: string,
    endereco?: IEndereco,
    nivel?: number,
    verified: boolean
}
