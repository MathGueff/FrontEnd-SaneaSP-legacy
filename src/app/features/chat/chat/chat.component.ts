import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '@core/services/sockets.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  standalone:true,
})
export class ChatComponent implements OnInit,OnDestroy {
 title = 'POC Socket.IO Angular';
  messages: string[] = [];
  newMessage = '';

  constructor(private socketService: SocketService) {}
  ngOnInit(): void {
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
  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

}
