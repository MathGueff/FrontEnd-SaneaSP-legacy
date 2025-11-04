import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFieldForm } from '@shared/models/field-form.model';
import { FormValidatorEnum } from '@shared/enums/form-validator.enum';
import { ToastService } from '@shared/services/toast.service';
import { ICreateFeedback } from '@features/feedback/models/feedback.model';
import { FeedbackService } from '@features/feedback/services/feedback.service';

@Component({
  selector: 'app-feedback-form',
  imports: [RouterModule, ReactiveFormsModule,],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css',
  standalone: true
})
export class FeedbackFormComponent {
  private formBuilderService = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private sweetAlertService = inject(SweetAlertService);
  private toastService = inject(ToastService);
  private feedbackService = inject(FeedbackService);

  protected formFeedback = this.formBuilderService.group({
    descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2048)]]
  })

  inputs: IFieldForm[] = [
    {
      controlName: 'descricao',
      type: 'text',
      icon: 'images/feedback/feedback_icon.svg',
      label: 'Descrição:',
      placeholder: 'Escreva aqui...',
      required: true,
      validators: [FormValidatorEnum.Required, FormValidatorEnum.MinLength, FormValidatorEnum.MaxLength]
    },
  ]

  onSubmit() {
    if (this.formFeedback.valid) {
      const newFeedback: ICreateFeedback = {
        data_publicacao: new Date(),
        descricao: this.formFeedback.controls.descricao.value,
        fk_funcionario: 1,
        fk_denuncia: 1,
        fk_cidadao: 1
      }

      this.feedbackService.postFeedback(newFeedback).subscribe({
        next: () => {
          this.sweetAlertService.showMessage('Feedback enviado com sucesso!');
          this.router.navigate(['reclamacao']);
          this.onCancel();
        }, error: () => {
          this.toastService.show({
            message: "Erro ao enviar feedback",
            error: true
          });
          this.router.navigate(['']);
        }
      })
    } else {
      this.toastService.show({
        message: "Descreva com foi sua experiência ou clique em CANCELAR",
        error: true
      });
    }
  }

  onCancel() {
    this.router.navigate(['']);
  }
}