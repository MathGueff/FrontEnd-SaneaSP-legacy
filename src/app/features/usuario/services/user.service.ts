import { IUser } from '@features/usuario/models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private API_URL =  environment.domain + "user/"

  constructor(private httpClient: HttpClient) { }

  getUserById(id : number):Observable<IUser>{
    return this.httpClient.get<IUser>(this.API_URL + id);;
  }

  private users: IUser[] = [];

  /* Pega todos os usuários existentes local */
  public getAllUsers(): IUser[] {
    return this.users;
  }
}