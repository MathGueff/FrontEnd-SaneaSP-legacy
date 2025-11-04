import { Component, Input } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocketService } from '@core/services/sockets.service';
import { ComentarioInput } from '@features/comentario/models/comentario.model';
import { IUser } from '@features/usuario/models/usuario.model';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';

@Component({
    selector: 'app-comentario-input',
    imports: [ReactiveFormsModule],
    templateUrl: './comentario-input.component.html',
    styleUrl: './comentario-input.component.css',
    standalone:true
})
export class ComentarioInputComponent {
  @Input() userCurrent !: IUser;
  @Input() denuncia !: IReclamacao
  rows: number = 0;
  inputText : FormGroup;

  constructor(private formBuilder : FormBuilder, private socketService:SocketService){
    this.inputText = this.formBuilder.group({
      textForm:['', Validators.required]
    })
  }

  //Gerencia quantas linhas terá o <textarea>
  autoResize():void {
    let objTextArea = document.querySelector('textarea');
    if (objTextArea?.value) {
      if (objTextArea.scrollHeight > objTextArea.offsetHeight) {
        this.rows += 1;
      }
    } else {
      this.rows = 0;
    }
  }
  onSubmit() {

    if(this.inputText.valid){
      let mensage : ComentarioInput  = {
        descricao: this.inputText.value.textForm,
        usuario: this.userCurrent,
        denuncia : this.denuncia
      };
      this.inputText.setValue({textForm: ''});
      this.socketService.emit('newComentario', mensage);
    }
    else{
      console.log('Mensagem vazia');
    }
  }
}
