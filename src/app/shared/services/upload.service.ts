import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class UploadService{
    private apiURL = environment.domain + "upload/imagens"
    constructor(private http : HttpClient){}
    public postUpload(file: File[]) : Observable<string[]>{
        return this.http.post<string[]>(this.apiURL,file);
    }
}