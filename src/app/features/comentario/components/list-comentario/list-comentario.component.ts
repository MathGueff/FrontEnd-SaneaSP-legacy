import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { SocketService } from '@core/services/sockets.service';
import { IComentario } from '@features/comentario/models/comentario.model';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-list-comentario',
  imports: [RouterLink],
  templateUrl: './list-comentario.component.html',
  styleUrl: './list-comentario.component.css',
  standalone:true
})
export class ListComentarioComponent implements OnInit {
  private socketService = inject(SocketService);
  private authService = inject(AuthService);
  // Exemplo de como ficaria a lista de items como um Signal
  // chatItems = signal<ChatListItem[]>([ ... ]); 
  // Mas para o seu exemplo, a array normal já funciona com o @for:
  chatItems: IComentario[] = [];
  

  ngOnInit(): void {
    let user = this.authService.getCurrentUser();
    this.socketService.emit('allComentarios',user?.id)
    this.socketService.on<IComentario[]>('allComentarios').subscribe({
      next:(itens)=> {
        this.chatItems = itens;
      },
      error(err) {
        console.error(err);
      },
    })
   }
  openChat(item: any): void {
    console.log(`Abrindo chat com: ${item.name}`);
  }
}