import { IFeedback } from "../models/feedback.model";
import { IUser } from "@features/usuario/models/usuario.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FeedbackService {
    private urlApi: string = environment.domain + "feedback";

    constructor(private httpClient: HttpClient) {}

    public postFeedback(feedback: IFeedback): Observable<IFeedback> {
        return this.httpClient.post<IFeedback>(this.urlApi, feedback);
    }

    public getFeedbackById(id: number): Observable<IFeedback> {
        return this.httpClient.get<IFeedback>(`${this.urlApi}/${id}`);
    }

    public getFeedback(): Observable<IFeedback[]> {
        return this.httpClient.get<IFeedback[]>(this.urlApi);
    }
}