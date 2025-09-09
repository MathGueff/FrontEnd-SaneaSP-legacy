import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

@Component({
  selector: 'app-confirm',
  imports: [RouterLink],
  template: `<p>Confirmando seu cadastro...</p>`
})
export class ConfirmationCadastroComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private sweetAlertService = inject(SweetAlertService);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.authService.confirmRegistration(token).subscribe({
        next: () => {
          this.sweetAlertService.showMessage('Cadastro confirmado com sucesso!');
          this.router.navigate(['/login'], { state: { confirmed: true } });
        },
        error: () => {
          this.sweetAlertService.showMessage('Falha ao confirmar o cadastro', true);
          this.router.navigate(['/login'], { state: { confirmed: false } });
        }
      });
    }
  }
}
