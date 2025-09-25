import { IDataset } from './../components/graph/graph.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IDataGraph } from '@shared/components/graph/graph.model';
import { Colors, Chart } from 'chart.js';
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
                    label:'rank da Bairros/Cidades Urgentes',
                    data:[],
                    backgroundColor:[],
                    borderColor:[],
                    borderWidth:1
                }
            ]
        };
        bigPoint.map((data)=>{
            if(data.bairro){
                graph.labels.push(data.bairro);
            }
            else{
                graph.labels.push(data.cidade);
            }
            console.log(Number(data.pontuacao))
            graph.datasets[0].data.push(Number(data.pontuacao));
            graph.datasets[0].backgroundColor!.push('red');
            graph.datasets[0].borderColor?.push('red');
        })
        return graph;
    }
}
