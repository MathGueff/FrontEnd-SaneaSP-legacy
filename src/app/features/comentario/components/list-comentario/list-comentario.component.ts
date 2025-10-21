import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-comentario',
  imports: [],
  templateUrl: './list-comentario.component.html',
  styleUrl: './list-comentario.component.css',
  standalone:true
})
export class ListComentarioComponent implements OnInit {
  // ... (ChatListItem interface e chatItems array permanecem iguais) ...
  
  // Exemplo de como ficaria a lista de items como um Signal
  // chatItems = signal<ChatListItem[]>([ ... ]); 
  // Mas para o seu exemplo, a array normal já funciona com o @for:
  chatItems: any[] = [
    { id: 1, name: 'Weekend', avatarUrl: 'assets/weekend.png', lastMessage: 'Sticker', lastMessageTime: '9:49', unreadCount: 2, isTyping: false, hasStatus: true, isMuted: false },
    { id: 2, name: 'João Pereira', avatarUrl: 'assets/joao.jpg', lastMessage: 'typing...', lastMessageTime: '9:45', unreadCount: 0, isTyping: true, hasStatus: false, isMuted: false },
    // ... (restante da lista)
  ];
  
  constructor() { }
  ngOnInit(): void { }
  openChat(item: any): void {
    console.log(`Abrindo chat com: ${item.name}`);
  }
}