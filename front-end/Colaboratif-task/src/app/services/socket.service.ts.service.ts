import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceTsService {
private socket : Socket;
  constructor() {
    this.socket = io('http://localhost:3400');
    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });
   }

   sendNotification(notification:any){
    this.socket.emit('sendNotification',notification);
   }


   onNotification(callback: (notification:any) => void){
    this.socket.on("recevedNotification", callback);
   }


   // fermer la connextion de la socket 

   disconnect(){
    if(this.socket){
      this.socket.disconnect();
    }
   }
}
