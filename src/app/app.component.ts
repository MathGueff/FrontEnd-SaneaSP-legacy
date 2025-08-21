import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "@core/components/header/header.component";
import { FooterComponent } from '@core/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./shared/components/toast/toast.component";


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, ToastComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PrjInterdisciplinar';
}
