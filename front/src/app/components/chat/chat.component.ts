import {Component, OnInit} from '@angular/core';
import {ChatMessage} from "../../models/chat-message";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user";
import {WebSocketService} from "../../services/web-socket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  messageInput: string = '';
  senderId!: string;
  receiverId!: string;
  userSelected: number = 0;

  users: User[] = [
    {
      id: "1",
      username: 'Good Cat',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnOrOwY43A2IXz1v0yLjmHVWj0d2_YMm_6eA&s'
    },
    {
      id: "2",
      username: 'Marie Curie',
      avatarUrl: 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1719619200&semt=sph'
    },
  ];

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.senderId = params['userId'];
      this.webSocketService.connect(this.senderId);
      this.webSocketService.getMessages().subscribe((message: ChatMessage) => {
        this.messages.push(message);
      });
    });
  }

  protected sendMessage() {
    const message: ChatMessage = {
      message: this.messageInput,
      senderId: this.senderId,
      receiverId: this.receiverId,
    };
    this.messages.push(message);
    this.webSocketService.sendMessage(message);
    this.messageInput = '';
  }

  protected selectUser(user: User): void {
    this.messages = [];
    this.receiverId = user.id;
    this.userSelected = parseInt(user.id);
  }
}
