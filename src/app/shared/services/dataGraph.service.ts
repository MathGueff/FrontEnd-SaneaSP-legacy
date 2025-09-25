import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

export interface BigPoints{
    cidade: string,
    bairro ?: string,
    pontuacao : number
}

@Injectable({providedIn: 'root'})

export class DataGraph{
    private URL = `${environment.domain}graph/`;
    constructor(private http : HttpClient){}
    public getBigPoints(limit?: number, cidade ?:string) : Observable<BigPoints[]>{
        let apiURL = `${this.URL}maioresPontuacoes?&&limit=${limit}`;
        if(cidade){
            apiURL += `&&cidade=${cidade}`
        }
        return this.http.get<BigPoints[]>(apiURL);
    }
}
