import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IDataGraph } from '@shared/components/graph/graph.model';
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
    public convertBigPointInChar(bigPoint:BigPoints[]):IDataGraph{
        let graph:IDataGraph = {
            labels:[],
            datasets:[
                {
                    label:'Pontuação',
                    data:[],
                    backgroundColor:[],
                    borderColor:[],
                    borderWidth:1
                }
            ]
        };
        bigPoint.forEach((data)=>{
            if(data.bairro){
                graph.labels.push(data.bairro);
            }
            else{
                graph.labels.push(data.cidade);
            }
            graph.datasets[0].data.push(Number(data.pontuacao));
            graph.datasets[0].backgroundColor!.push('red');
            graph.datasets[0].borderColor?.push('red');
        })
        return graph;
    }
}
