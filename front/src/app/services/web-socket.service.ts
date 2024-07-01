import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {ChatMessage} from "../models/chat-message";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private messageSubject = new Subject<any>();

  constructor() {
  }

  public connect(userId: string): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/user/${userId}/topic/messages`, (message: ChatMessage) => {
        this.onMessageReceived(message);
      });
    }, (error: string) => {
      console.error('Error during connection:', error);
    });
  }


  public sendMessage(message: ChatMessage) {
    this.stompClient.publish({
      destination: `/app/messages`,
      body: JSON.stringify(message)
    });
  }

  protected onMessageReceived(message: any) {
    this.messageSubject.next(JSON.parse(message.body));
  }

  public getMessages() {
    return this.messageSubject.asObservable();
  }
}
