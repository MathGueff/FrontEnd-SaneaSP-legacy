import { HttpClient, HttpHeaders } from "@angular/common/http";
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

    private currentUser = this.authService.currentUser$;

    public postFeedback(newFeedback: ICreateFeedback): Observable<IFeedback> {
        return this.httpClient.post<IFeedback>(`${this.urlApi}/create-feedback`, newFeedback, { headers: this.getAuthHeaders() });
    }

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getAuthToken();
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', token);
        }
        return headers;
    }

    private feedbacks: IFeedback[] = [];

    public getAllFeedBacks(): IFeedback[] {
        return this.feedbacks;
    }
    /*
    public putFeedback(feedback: IFeedback): Observable<IFeedback> {
        return this.httpClient.put<IFeedback>(`${this.urlApi}/${feedback.id}`, feedback);
    }
    */
    public deleteFeedback(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.urlApi}/${id}`, { headers: this.getAuthHeaders() });
    }
}