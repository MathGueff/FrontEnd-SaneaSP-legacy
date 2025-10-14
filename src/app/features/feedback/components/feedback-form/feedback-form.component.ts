import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '@shared/services/sweet-alert.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFieldForm } from '@shared/models/field-form.model';
import { FormValidatorEnum } from '@shared/enums/form-validator.enum';
import { ToastService } from '@shared/services/toast.service';


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

  protected formFeedback = this.formBuilderService.group({
    descricao: ['', Validators.required, Validators.minLength(10), Validators.maxLength(2048)]
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
      let descricao = this.formFeedback.controls.descricao.value;
      console.log(descricao);
      this.sweetAlertService.showMessage("Feedback enviado com sucesso");
    } else {
      this.toastService.show({
        message: "Descreva com foi sua experiência ou clique em CANCELAR",
        error: true
      });
    }
  }

  onCancel() {
    this.router.navigate(['reclamacao']);
  }

}