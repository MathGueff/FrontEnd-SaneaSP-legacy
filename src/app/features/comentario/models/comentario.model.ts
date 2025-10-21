import { IReclamacao, Reclamacao } from "@features/reclamacao/models/reclamacao.model";
import { IUser } from "@features/usuario/models/usuario.model";

export interface ComentarioInput{
  descricao:string,
  usuario: IUser,
  denuncia : IReclamacao
}
export interface IComentario{
  id : number,
  descricao:string,
  dataPublicacao: Date,
  fkDenuncia : number,
  fkUsuario : number,
  usuario : IUser,
  denuncia ?: IReclamacao
}

