import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { AuthService } from "@core/services/auth.service";
import { Observable } from "rxjs";
import { ICreateFeedback, IFeedback } from "../models/feedback.model";
import { Injectable, inject } from "@angular/core"

@Injectable({
    providedIn: 'root'
})

export class FeedbackService {
    private urlApi: string = environment.domain + 'feedback'
    private authService = inject(AuthService)

    constructor(private httpClient: HttpClient,) { }

    public postFeedback(newFeedback: ICreateFeedback): Observable<IFeedback> {
        return this.httpClient.post<IFeedback>(`${this.urlApi}/create-feedback`, newFeedback);
    }

    private feedbacks: IFeedback[] = [];

    public getAllFeedBacks(): IFeedback[] {
        return this.feedbacks;
    }

    public putFeedback(feedback: IFeedback): Observable<IFeedback> {
        return this.httpClient.put<IFeedback>(`${this.urlApi}/${feedback.id}`, feedback);
    }
}