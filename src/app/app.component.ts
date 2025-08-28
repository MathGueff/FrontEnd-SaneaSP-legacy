import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "@core/components/header/header.component";
import { FooterComponent } from '@core/components/footer/footer.component';

import { ToastComponent } from "./shared/components/toast/toast.component";



@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone:true
})
export class AppComponent {
  title = 'PrjInterdisciplinar';
}
