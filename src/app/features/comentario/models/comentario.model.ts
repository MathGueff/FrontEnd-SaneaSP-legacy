import { Reclamacao } from "@features/reclamacao/models/reclamacao.model";
import { IUser } from "@features/usuario/models/usuario.model";

export interface ComentarioInput{
  descricao:string,
  usuario: IUser
}
export interface ComentarioRead{
  id: number,
  descricao:string,
  data:string,
  usuario: IUser
}
export class Comentario {
  id: number | null = 0;
  descricao:string = '';
  data: string = ''; //por enquanto é tipo String
  objAdmin: string | null = null; // ObjAdmin será do tipo number, como usa-lo como se fosse o Id do Admin. O tipo null é para poder controlar o comentario
  objReclamacao !: Reclamacao;
  objUsuario !: IUser;
descricaoComentario: any;
dataComentario: any;
}
