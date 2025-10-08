import { SweetAlertService } from '@shared/services/sweet-alert.service';

import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ViacepService } from '@shared/services/viacep.service';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';
import { ICreateReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { ICategoria } from '@features/categoria/models/categoria.model';
import { TagSelectComponent } from "@shared/components/tag-select/tag-select.component";
import { ImageSelectComponent } from "@shared/components/image-select/image-select.component";
import { MapComponent } from "@shared/components/map/map.component";
import { createDecipheriv } from 'crypto';
import { UploadService } from '@shared/services/upload.service';
import { AuthService } from '@core/services/auth.service';


@Component({
  selector: 'app-reclamacao-form',
  imports: [ReactiveFormsModule, RouterLink, TagSelectComponent, ImageSelectComponent],
  templateUrl: './reclamacao-form.component.html',
  styleUrl: './reclamacao-form.component.css',
  standalone: true
})
export class ReclamacaoFormComponent implements OnInit {

  private authService = inject(AuthService)
  private reclamacaoService = inject(ReclamacaoService);
  private formBuider = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private viacepService = inject(ViacepService);
  private sweetService = inject(SweetAlertService);
  private uploadService = inject(UploadService);

  private imageFiles: File[] = [];
  private fileNames: string[] = [];
  private tagIDs: number[] = [];
  rows: number = 2;

  form = this.formBuider.group({/*  */
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    cep: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
    numero: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    rua: ['', [Validators.required]],
    complemento: ['']
  });

  onSubmit() {
    if (this.form.valid) {

      this.uploadService.postUpload(this.imageFiles).subscribe({
        next:(files)=>{
          this.fileNames = files;
        }
      })
      const formData = new FormData();

      // Campos de texto
      formData.append('titulo', this.form.value.titulo!);
      formData.append('descricao', this.form.value.descricao!);
      formData.append('cep', this.form.value.cep!);
      formData.append('numero', this.form.value.numero!);
      formData.append('cidade', this.form.value.cidade!);
      formData.append('bairro', this.form.value.bairro!);
      formData.append('rua', this.form.value.rua!);
      formData.append('complemento', this.form.value.complemento ?? '');
      const user = this.authService.getCurrentUser();
      if(user)
        formData.append('idUsuario', user.id.toString());

      this.tagIDs.forEach(id => formData.append('Categorias[]', id.toString()));

      if (this.imageFiles) {
        Array.from(this.imageFiles).forEach(file => {
          formData.append('imagens', file);
        });
      }

      this.reclamacaoService.postReclamacao(formData).subscribe({
        next: async () => {
          await this.sweetService.showMessage("Denúncia Criada com sucesso!");
          this.router.navigate(['reclamacao']);
        },
        error: () => {
          this.sweetService.showMessage(`Não foi possivel criar Denúncia. Verifique se preencheu corretamente o formulário`, true)
        },
      });
    }
    else {
      this.sweetService.showMessage('Formulário inválido. Preeche todos os dados obrigatórios *', true)
    }
  }
  ngOnInit(): void {
    this.form.controls.cep.valueChanges.subscribe(() => {
      if (
        this.form.controls.cep.valid &&
        this.form.controls.cep.value.length == 8) {
        this.searchAddress();
      } else {
        console.log('CEP INVÁLIDO');
        this.resetAddressControls();
      }
    });
  }
  searchAddress() {
    this.viacepService.getAddress(this.form.controls.cep.value).subscribe({
      next: (response) => {
        if (response.logradouro) {
          this.setAddressControl('rua', response.logradouro);
        } else {
          console.log('A rua não foi encontrada para o CEP informado.');
        }

        if (response.bairro) {
          this.setAddressControl('bairro', response.bairro);
        } else {
          console.log('O logradouro não foi encontrado para o CEP informado.');
        }

        if (response.localidade) {
          this.setAddressControl('cidade', response.localidade);
        } else {
          console.log('A cidade não foi encontrada para o CEP informado.');
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  resetAddressControls() {
    let addressControls = ['rua', 'bairro', 'cidade'];
    addressControls.forEach((field) => {
      this.form.get(field)!.reset();
    });
  }

  private setAddressControl(control: string, value: string) {
    this.form.get(control)?.setValue(value);
  }
  protected autoResize(): void {
    let objTextArea = document.querySelector('textarea');
    if (objTextArea?.value) {
      if (objTextArea.scrollHeight >= objTextArea.offsetHeight) {
        this.rows += 1;
        console.log("Scroll Height: " + objTextArea.scrollHeight);
        console.log("offsetHeight: " + objTextArea.offsetHeight);
      }
    } else {
      this.rows = 2;
    }
  }
  public tagsChange($event: ICategoria[]) {
    this.tagIDs = $event.map((tag) => tag.id)
  }

    public imageChange($event: File[]) {
    if ($event.length > 0) {
      $event.map((file) => this.imageFiles.push(file));
    }
  }
}
