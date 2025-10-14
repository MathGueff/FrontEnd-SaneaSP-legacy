import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '@core/services/sockets.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
 title = 'POC Socket.IO Angular';
  messages: string[] = [];
  newMessage = '';

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.onMessage().subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.socketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
