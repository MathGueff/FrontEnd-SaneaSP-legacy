import { Injectable } from '@angular/core';
import { IResponse } from '../models/response.model';
import { IToast } from '../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  public toasts: IToast[] = [];
  private readonly MAX_TOASTS = 3
  private readonly DURATION_TOAST_MS = 4000 //Em ms

  /** 
   * @param response mensagem e erro (true ou false), 
   * pode ser passado com um retorno de uma chamada de service
   * 
   * @description Exibe uma mensagem na tela no canto inferior direito
  */
  show(response : IResponse) {
    const image = response.error ? "error_icon.svg" : "success_icon.svg"
    const iconUrl = `icons/ui/color/${image}`;

    const toast : IToast= {
      id : Date.now(), //Para evitar IDs repetidos, utilizando a data de criação 
      ...response,
      iconUrl
    }
      
    //Evita que muitos toast se acumulem na tela, remove o toast mais antigo para criação do novo
    if(this.toasts.length >= this.MAX_TOASTS){
      this.remove(this.toasts[0])
    }

    this.toasts.push(toast);

    setTimeout(() => {
      this.remove(toast);
    }, this.DURATION_TOAST_MS);
  }

  /** 
   * @param toast O objeto de toast que deve ser removido
   * 
   * @description Remove um toast ativo
  */
  //Reinicia a lista ignorando o id do toast passado
  remove(toast: IToast) {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  }
}