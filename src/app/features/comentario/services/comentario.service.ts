import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IComentario } from '../models/comentario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private base_URL:string = environment.domain + 'comentario/';
  constructor(private httpClient:HttpClient){}
  public getComentarioByDenuncia(id:number):Observable<IComentario[] | undefined>{
    const url = this.base_URL + id
    return this.httpClient.get<IComentario[] | undefined>(url)
  }
}
