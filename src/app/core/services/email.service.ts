import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({ providedIn: 'root' })
export class EmailService {
    private API_URL = environment.domain;

    constructor(private HttpClient : HttpClient){}

    sendEmail(data: any) {
        return this.HttpClient.post(this.API_URL + "mailer/send", data);
    }
}