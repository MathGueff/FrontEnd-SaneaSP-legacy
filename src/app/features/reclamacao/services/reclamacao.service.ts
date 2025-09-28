import { ICategoria } from '@features/categoria/models/categoria.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICreateReclamacao, IReclamacao } from "@features/reclamacao/models/reclamacao.model";
import { AuthService } from "@core/services/auth.service";
import { environment } from 'environments/environment';

@Injectable ({providedIn:'root'})
export class ReclamacaoService{
  private urlApi:string = environment.domain +"denuncia";
  private urlApiImages: string = environment.domain +"upload";

  private authService = inject(AuthService);
  private listReclamcao !: IReclamacao[];
  constructor(private httpClient:HttpClient){}

  public getObservableReclamacao() : Observable<IReclamacao[]> {
    return this.httpClient.get<IReclamacao[]>(`${this.urlApi}/`)
  }

  public getByIdReclamacao(id:number):Observable<IReclamacao>{
    return  this.httpClient.get<IReclamacao>(`${this.urlApi}/${id}`);
  }

  public getByTag(tags:ICategoria[],idUsuario?:number):Observable<IReclamacao[]>{
    let query:string = ""
    tags.forEach((tag,i)=>{
      query += `tags=${tag.id}`;
      if(i+1 !== tags.length) query += '&'
    })
    if(idUsuario){
      query += `&idUsuario=${idUsuario}`
    }
    return this.httpClient.get<IReclamacao[]>(`${this.urlApi}/tags/?${query}`)
  }

  public postReclamacao(reclamacao: ICreateReclamacao):Observable<IReclamacao>{
    const headers = this.setHeader();
    const user = this.authService.getCurrentUser();
    if(user){
      reclamacao.idUsuario = user.id as number;
    }
    return this.httpClient.post<IReclamacao>(`${this.urlApi}`, reclamacao,{headers})
  }
  public putReclamacao(reclamacao:ICreateReclamacao, idReclamacao: number){
    const headers = this.setHeader();
    return this.httpClient.put<IReclamacao>(`${this.urlApi}/${idReclamacao}`,reclamacao, {headers})
  }
  public deleteReclamacao(idReclamacao:number){
    const headers = this.setHeader();
    return this.httpClient.delete<IReclamacao>(`${this.urlApi}/${idReclamacao}`,{headers})
  }

  public getByUser():Observable<IReclamacao[]>{
    const headers = this.setHeader();
    return this.httpClient.get<IReclamacao[]>(`${this.urlApi}/usuario`,{headers})
  }

  private setHeader():HttpHeaders{
    const token = this.authService.getAuthToken();
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization',token)
    }
    return headers
  }

  public uploadImages(idDenuncia: number, files: File[]): Observable<any> {
    const headers = this.setHeader();
    const formData = new FormData();
    files.forEach(file => formData.append("images", file)); // 'images' = campo do Multer
    return this.httpClient.post(`${this.urlApiImages}/${idDenuncia}`, formData, { headers });
  }

  public updateImages(idDenuncia: number, files: File[]): Observable<any> {
    const headers = this.setHeader();
    const formData = new FormData();
    files.forEach(file => formData.append("images", file));
    return this.httpClient.put(`${this.urlApiImages}/${idDenuncia}`, formData, { headers });
  }

  public deleteAllImages(idDenuncia: number): Observable<any> {
    const headers = this.setHeader();
    return this.httpClient.delete(`${this.urlApiImages}/${idDenuncia}`, { headers });
  }
}
