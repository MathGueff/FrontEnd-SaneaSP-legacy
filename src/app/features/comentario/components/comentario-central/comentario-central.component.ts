import { ComentarioRead } from './../../models/comentario.model';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ComentarioBaixoComponent } from '../comentario-baixo/comentario-baixo.component';
import { ComentarioCimaComponent } from '../comentario-cima/comentario-cima.component';
import { CommonModule } from '@angular/common';
import { ComentarioInputComponent } from '../comentario-input/comentario-input.component';
import { Comentario } from '../../models/comentario.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '@features/usuario/services/user.service';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';
import { SocketService } from '@core/services/sockets.service';
import { AuthService } from '@core/services/auth.service';
import { IUser } from '@features/usuario/models/usuario.model';

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
  private activeroute = inject(ActivatedRoute);
  private route = inject(Router);
  private socketService = inject(SocketService);
  private authService = inject(AuthService)
  public reclamacao$ !: Observable<IReclamacao>
  //variaveis para poder controlar o componente NotFound
  public userCurrent !: IUser

  messages: ComentarioRead[] =[];


  //Observable Comentário
  private comentarioSubject: BehaviorSubject<Comentario[]> =
    new BehaviorSubject([] as any);
  comentario$ !: Observable<any> 

  //   {
  //   id: 1,
  //   descricaoComentario: "Estamos há três dias sem água no bairro, precisamos de uma solução urgente.",
  //   dataComentario: "2024-11-28T10:00:00",
  //   objAdmin: null,
  //   objReclamacao: this.reclamacoes[0],
  //   objUsuario: this.usuarios[0]
  //}

  
  ngOnInit(): void {
    let user = this.authService.getCurrentUser();
    if(!user){
      this.route.navigate(['/']);
      return;
    }
    this.userCurrent = user;
    this.activeroute.params.subscribe((params) => {

      
      const IdParametro = Number(params['idReclamamacao']);
      this.reclamacao$ = this.reclamacaoService.getByIdReclamacao(IdParametro);

      this.socketService.on<ComentarioRead>('comentario').subscribe(msg => {
        this.messages.push(msg);
        console.log(this.messages)
      });
    });
  }
}


