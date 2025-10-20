
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ComentarioBaixoComponent } from '../comentario-baixo/comentario-baixo.component';
import { ComentarioCimaComponent } from '../comentario-cima/comentario-cima.component';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@features/usuario/services/user.service';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { IReclamacao } from '@features/reclamacao/models/reclamacao.model';
import { ReclamacaoService } from '@features/reclamacao/services/reclamacao.service';
import { SocketService } from '@core/services/sockets.service';
import { AuthService } from '@core/services/auth.service';
import { IUser } from '@features/usuario/models/usuario.model';
import { IComentario } from '@features/comentario/models/comentario.model';
import { ComentarioInputComponent } from '../comentario-input/comentario-input.component';

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

  messages: IComentario[] =[];

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

      this.socketService.on<IComentario>('comentario').subscribe(msg => {
        this.messages.push(msg);
        console.log(msg)
      });
    });
  }
}


