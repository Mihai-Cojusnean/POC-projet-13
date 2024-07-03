import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {ChatMessage} from "../models/chat-message";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private messageSubject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  public connect(userId: string): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/user/${userId}/topic/message`, (message: ChatMessage) => {
        this.onMessageReceived(message);
      });
    }, (error: string) => {
      console.error('Error during connection:', error);
    });
  }

  public sendMessage(message: ChatMessage): void {
    this.stompClient.send(`/app/message/${message.receiverId}`, {}, JSON.stringify(message));
  }

  protected onMessageReceived(message: any): void {
    this.messageSubject.next(JSON.parse(message.body));
  }

  public getUserChatMessages(userId1: string, userId2: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`http://localhost:8080/api/messages/${userId1}/${userId2}`);
  }

  public getMessages() {
    return this.messageSubject.asObservable();
  }
}
