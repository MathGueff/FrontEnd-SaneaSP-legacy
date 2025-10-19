import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

@Component({
  selector: 'app-feedback-modal',
  standalone: true,
  template: ''
})
export class FeedbackModalComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sweetAlertService = inject(SweetAlertService);

  ngOnInit(): void {
    this.abrirModal();
  }

  //Quando uma denúncia (reclamaçao) está com o estatus resolvida, abre um modal para responder um breve formulário de feedback
  private async abrirModal(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const confirm = await this.sweetAlertService.confirmFeedback(+id);
      if (confirm) {
        this.router.navigate(['reclamacao', id, 'feedback']);
      } else {
        this.router.navigate(['reclamacao']);
      }
    }
  }
}
