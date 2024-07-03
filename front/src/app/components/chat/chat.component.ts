import {Component, OnInit} from '@angular/core';
import {ChatMessage} from "../../models/chat-message";
import {ActivatedRoute} from "@angular/router";
import {Customer} from "../../models/customer";
import {WebSocketService} from "../../services/web-socket.service";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  customers: Customer[] = [];
  messageInput: string = '';
  currUserId!: string;           /* curr - current */
  pickedUserIdx: number = 0;     /* idx - index */
  newMessageCounts: { [key: string]: number } = {};

  constructor(
      private webSocketService: WebSocketService,
      private customerService: CustomerService,
      private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currUserId = params['userId'];
      this.loadChatData();
      this.connectWebSocket();
      this.subscribeToMessages();
    });
  }

  protected sendMessage() {
    const message: ChatMessage = {
      content: this.messageInput,
      receiverId: this.pickedUserIdx ? this.pickedUserIdx.toString() : 'admin',
      senderId: this.currUserId,
      timestamp: new Date().toISOString(),
    };
    this.messages.push(message);
    this.webSocketService.sendMessage(message);
    this.messageInput = '';
  }

  protected selectCustomer(customerId: string): void {
    this.loadMessages(customerId);
    this.pickedUserIdx = parseInt(customerId);
    this.newMessageCounts[customerId] = 0;
  }

  private loadChatData(): void {
    if (this.currUserId == "admin") {
      this.loadClientList();
    } else {
      this.loadMessages(this.currUserId);
    }
  }

  private connectWebSocket(): void {
    this.webSocketService.connect(this.currUserId);
  }

  private loadMessages(customerId: string): void {
    this.webSocketService.getUserChatMessages(customerId, "admin").subscribe((message: ChatMessage[]) => {
      this.messages = message;
    });
  }

  private loadClientList(): void {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      customers.forEach((customer: Customer) => {
        this.newMessageCounts[customer.id] = 0;
      })
      this.customers = customers;
    });
  }

  private subscribeToMessages(): void {
    this.webSocketService.getMessages().subscribe((message: ChatMessage) => {
      if (!(this.currUserId == 'admin' && message.senderId != this.pickedUserIdx.toString())) {
        this.messages.push(message);
      }
      if (this.currUserId == 'admin' && this.pickedUserIdx.toString()
          != message.senderId && message.senderId != 'admin') {
        this.newMessageCounts[message.senderId]++;
      }
    });
  }
}
