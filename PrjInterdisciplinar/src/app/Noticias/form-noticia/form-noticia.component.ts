import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import { DoencaService } from '../../Services/doenca.service';
import { IFieldForm } from '../../models/fieldForm.model';
import { CommonModule } from '@angular/common';
import { CheckErrorComponent } from '../../Common/check-error/check-error.component';
import { FormFieldComponent } from '../../Common/form-field/form-field.component';
import { NoticiaErrorStatus } from '../NoticiaErrorStatus.enum';
import { INoticia } from '../../models/noticias.model';
import { NoticiaService } from '../../Services/noticia.service';
import { SweetAlertService } from '../../Services/sweetAlert.service';

@Component({
  selector: 'app-form-noticia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormFieldComponent, CheckErrorComponent],
  templateUrl: './form-noticia.component.html',
  styleUrl: './form-noticia.component.css'
})
export class FormNoticiaComponent {
    //Injeção de Dependências
    private fb = inject(NonNullableFormBuilder);
    private noticiaService = inject(NoticiaService);
    private router = inject(Router);
    private sweetAlert = inject(SweetAlertService);

    protected noticiaErrorStatus : NoticiaErrorStatus = NoticiaErrorStatus.None; //Var de erros
    protected tags : string[] = []; //Tags adicionadas
    protected fontes : string[] = []; //Fontes adicionadas
    protected imagens : string[] = []; //Imagens adicionadas

    src: any = null; // src atual para preview

    protected formNoticia = this.fb.group({
      titulo_noticia : ['', [Validators.required]],
      descricao_noticia : ['', [Validators.required, Validators.minLength(15)]],
      fonte : [''],
      tag : [''],
      imagem : ['']
    })

    //Configuração dos inputs do formulário

    inputs : IFieldForm[] = [
      {
        controlName:'titulo_noticia', 
        icon:'assets/icones/icon_black_noticia.svg', 
        label:'Título da notícia:', 
        placeholder: 'Digite o título da notícia', 
        required: true, 
        validators: ['required']
      },
      {
        controlName:'descricao_noticia', 
        icon:'img/paginas/reclamacoes/description-icon.svg', 
        label:'Descrição da Notícia:', 
        placeholder: 'Descrição da notícia', 
        required: true, 
        validators: ['required','minlength'],
        typeField: 'textarea',
      },
    ];

    ngOnInit() {
      this.resetErrorStatus();
    }

    onSubmit(){
      if(this.isFormValid()){
        if(this.noticiaService.validateNoticia(this.formNoticia.controls.titulo_noticia.value)){
          this.createNewNoticia();
          this.router.navigate(['/noticia-inicial']);
        }
        else{
          this.noticiaErrorStatus = NoticiaErrorStatus.invalidName
        }
      }
      else{
        this.noticiaErrorStatus = NoticiaErrorStatus.invalidControl
      }
    }

    onEnter(event: Event, type: string): void {
      // Previne o comportamento padrão (envio automático do formulário)
      event.preventDefault();

      // Adiciona dependendo do tipo de campo
      if (type === 'fonte') {
        this.addFonte();
      } else if(type === 'tag'){
        this.addTag();
      }
    }

    createNewNoticia(){
      const newNoticia : INoticia = {
        id : this.noticiaService.getCurrentID(),
        titulo : this.formNoticia.controls.titulo_noticia.value,
        descricao : this.formNoticia.controls.descricao_noticia.value,
        tags_noticia : this.tags,
        fontes_noticia : this.fontes,
        imagens_noticia : this.imagens,
      }
      console.log(newNoticia);
      this.noticiaService.newNoticia(newNoticia);
      this.sweetAlert.showMessage("Notícia cadastrada com sucesso")
    }

    private isFormValid(): boolean {
      return this.formNoticia.valid &&
        this.tags.length > 0 &&
        this.fontes.length > 0 &&
        this.imagens.length > 0;
    }

    //#region Fontes
    addFonte(){
      const fonte = this.formNoticia.controls.fonte;
      if(fonte.valid && fonte.value != ""){
        let fonte_novo = fonte.value;
        fonte_novo = fonte_novo.trim();
        if(!this.fontes.some((fonte) => fonte == fonte_novo )){
          fonte.reset();
          this.fontes.push(fonte_novo);
        }
        else{
          this.noticiaErrorStatus = NoticiaErrorStatus.invalidFonte;
        }
      }
      else{
        this.noticiaErrorStatus = NoticiaErrorStatus.nullFonte;
      }
    }

    removeFonte(fonte_excluida : string){
      const i = this.fontes.indexOf(fonte_excluida);
      if (i !== -1) {
        this.fontes.splice(i, 1);  
      }
    }
    //#endregion

    //#region Tags
    addTag(){
      const tag = this.formNoticia.controls.tag;
      if(tag.valid && tag.value != ""){
        let tag_novo = tag.value;
        tag_novo = tag_novo.trim();
        if(!this.tags.some((tag) => tag == tag_novo )){
          tag.reset();
          this.tags.push(tag_novo);
        }
        else{
          this.noticiaErrorStatus = NoticiaErrorStatus.invalidTag;
        }
      }
      else{
        this.noticiaErrorStatus = NoticiaErrorStatus.nullTag;
      }
    }

    removeTag(tag_excluida : string){
      const i = this.tags.indexOf(tag_excluida);  
      if (i !== -1) {
        this.tags.splice(i, 1);  
      }
    }
    //#endregion

    //#region Imagens
    protected setPreview(event: any){
      const file:File = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.src = e.target.result;
          const imageName = file.name;
          this.imagens.push(imageName); 
        };
        reader.readAsDataURL(file);
      }
    }

    protected removePreview(){
      this.formNoticia.controls.imagem.reset();
      this.src = null;
      this.imagens = [];
    }
    //#endregion

    resetErrorStatus(){
      // Detecta mudanças nos campos para resetar o status do erro atual
      Object.keys(this.formNoticia.controls).forEach(control => {
        this.formNoticia.get(control)?.valueChanges.subscribe(() => {
          // Limpando o erro quando o usuário alterar o valor do campo 'senha'
          this.noticiaErrorStatus = NoticiaErrorStatus.None;
        });
      });
    }

    checkIfFormError(status : string) : boolean{
      /* Recebe o valor do enum (em string) e compara com o estado atual do formulário, se forem iguais, retorna true */
      return this.noticiaErrorStatus == status
    }
}
