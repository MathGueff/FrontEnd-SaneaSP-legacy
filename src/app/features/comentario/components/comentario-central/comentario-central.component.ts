
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ComentarioBaixoComponent } from '../comentario-baixo/comentario-baixo.component';
import { ComentarioCimaComponent } from '../comentario-cima/comentario-cima.component';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { UserService } from '@features/usuario/services/user.service';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';
import { SocketService } from '@core/services/sockets.service';
import { AuthService } from '@core/services/auth.service';
import { IUser } from '@features/usuario/models/usuario.model';
import { IComentario } from '@features/comentario/models/comentario.model';
import { ComentarioInputComponent } from '../comentario-input/comentario-input.component';
import { ComentarioService } from '@features/comentario/services/comentario.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

@Component({
    selector: 'app-comentario-central',
    imports: [
        CommonModule,
        ComentarioCimaComponent,
        ComentarioBaixoComponent,
        ComentarioInputComponent,
        RouterModule,
        NotFoundComponent
    ],
    templateUrl: './comentario-central.component.html',
    styleUrl: './comentario-central.component.css',
    standalone:true
})
export class ComentarioCentralComponent implements OnInit {
  private reclamacaoService = inject(ReclamacaoService);
  private authService = inject(AuthService);
  private activeroute = inject(ActivatedRoute);
  private socketService = inject(SocketService);
  private SweetService = inject(SweetAlertService);
  public reclamacao$ !: Observable<IReclamacao>;
  public comentarioService = inject(ComentarioService);
  //variaveis para poder controlar o componente NotFound
  public userCurrent !: IUser | null;

  messages: IComentario[] =[];

   ngOnInit(): void {
    this.userCurrent = this.authService.getCurrentUser();

    this.activeroute.params.subscribe(async (params) => {
      const IdParametro = Number(params['idReclamamacao']);
      this.reclamacao$ = this.reclamacaoService.getByIdReclamacao(IdParametro);

      const comentarios = await firstValueFrom(this.comentarioService.getComentarioByDenuncia(IdParametro))
       console.log(this.userCurrent);
      if(comentarios){
        this.messages = comentarios
      }
      else{
        this.SweetService.showMessage('Não foi possível carregar mensagens anteriores',true)
      }
      this.socketService.on<IComentario>('comentario').subscribe(msg => {
        this.messages.push(msg);
        console.log(msg)
      });
    });
  }
}


