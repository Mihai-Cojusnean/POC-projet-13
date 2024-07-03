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

  constructor(
    private webSocketService: WebSocketService,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currUserId = params['userId'];
      if (this.currUserId == "admin") {
        this.loadClientList();
      } else {
        this.loadMessages(this.currUserId);
      }
      this.webSocketService.connect(this.currUserId);
      this.webSocketService.getMessages().subscribe((message: ChatMessage) => {
        if (message.senderId == this.currUserId || this.currUserId == 'admin') {
          this.messages.push(message);
        }
      });
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
  }

  private loadMessages(customerId: string): void {
    this.webSocketService.getUserChatMessages(customerId, "admin").subscribe((message: ChatMessage[]) => {
      this.messages = message;
    });
  }

  private loadClientList() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }
}
