import { UserService } from '@features/usuario/services/user.service';
import {IComentario } from '../../models/comentario.model';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-comentario-baixo',
    imports: [],
    templateUrl: './comentario-baixo.component.html',
    styleUrl: './comentario-baixo.component.css',
    standalone:true
})
export class ComentarioBaixoComponent implements OnInit {
  @Input() comentario!: IComentario;

  userService = inject(UserService);

  ngOnInit(): void {

  }
}
