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

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on<T>(event: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    })
  }
 public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
