import { Reclamacao } from "./reclamacao";
import { IUser } from "./user.model";

export class Comentario {
  id: number = 0;
  descricaoComentario:string = '';
  dataComentario: string = ''; //por enquanto é tipo String
  objAdmin: string | null = null; // ObjAdmin será do tipo number, como usa-lo como se fosse o Id do Admin. O tipo null é para poder controlar o comentario
  objReclamacao !: Reclamacao;
  objUsuario !: IUser; // 
}