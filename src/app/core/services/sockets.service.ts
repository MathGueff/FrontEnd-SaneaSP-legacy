import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Conecta ao backend Socket.IO
    this.socket = io();

  }

  // Envia mensagem ao servidor
  sendMessage(msg: string) {
    console.log(msg)
    this.socket.emit('message', msg);
  }

  // Ouve mensagens do servidor
  onMessage(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('message', (msg: string) => {
        observer.next(msg);
        console.log(msg)
      });
    });
  }
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
