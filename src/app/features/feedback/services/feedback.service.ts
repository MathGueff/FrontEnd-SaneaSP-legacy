import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { SweetAlertService } from "@shared/services/sweet-alert.service";
import { ErrorService } from "@core/services/error-handler.service";
import { ICreateFeedback, IFeedback } from "../models/feedback.model";

export class FeedbackService {
    private urlApi: string = environment.domain + 'feedback'

    constructor(
        private httpClient: HttpClient,
        private sweetAlertService: SweetAlertService,
        private errorService: ErrorService
    ) { }

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