import { Injectable } from '@angular/core';
import { ServiceService } from '../../login/services/service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../Models/ChatMessage';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8089';


  private stompClient: any
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor(private http:HttpClient) { 
    this.initConnenctionSocket();
  }

  initConnenctionSocket() {
    const url = '//localhost:8089/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket)
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage);

      })
    })
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }

  getMessageSubject(){
    return this.messageSubject.asObservable();
  }

  getConnectedUsers(): Observable<any> {
    // Assuming the endpoint for connected users is /listUsers
    const url = `${this.baseUrl}/listUsers`;
    return this.http.get<any>(url);
  }


  sendImage(userId: string, image: FormData) {
    // Effectuez une requête HTTP POST pour envoyer l'image
    return this.http.post(`${this.baseUrl}/sendImage/${userId}`, image);
  }
 
}
