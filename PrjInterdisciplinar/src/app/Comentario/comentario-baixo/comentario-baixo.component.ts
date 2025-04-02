import { UserService } from './../../Services/user.service';
import { Comentario } from './../../models/comentario';
import { Component, inject, input, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentario-baixo',
  standalone: true,
  imports: [],
  templateUrl: './comentario-baixo.component.html',
  styleUrl: './comentario-baixo.component.css',
})

export class ComentarioBaixoComponent implements OnInit {
  exibeMenu: boolean = false;
  public deletaComentario(id: number) {
    this.userService.deletarComentario(id).subscribe({
      next: (comentario: Comentario) => {
        console.log('Comentario deletado com sucesso:', comentario);
      },
      error: (error: any) => {
        console.error('Erro ao deletar comentário:', error);
      },
    });
  }

  
  @Input() comentario!: Comentario;
  userService = inject(UserService);
  autor: string = '';
  
  ngOnInit(): void {
    if (this.comentario.objUsuario && this.comentario.objUsuario.id){
      if (this.comentario.objAdmin === null) {
        this.userService.findUserById(this.comentario.objUsuario.id).subscribe({
          next: (user) => {
            if (user) {
              this.autor = user.nome;
            }
          },
          error: (error) => {
            console.error('Erro ao buscar usuário:', error);
          },
        });
      } else {
        this.autor = this.comentario.objAdmin;
      }
    }
  }
}
