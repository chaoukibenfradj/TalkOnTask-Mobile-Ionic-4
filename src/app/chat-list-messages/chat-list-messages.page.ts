import { Message } from './../models/message.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat-list-messages',
  templateUrl: './chat-list-messages.page.html',
  styleUrls: ['./chat-list-messages.page.scss'],
})
export class ChatListMessagesPage implements OnInit {
  @ViewChild('myInput', { static: false }) myInput: ElementRef;

  selectedUserId: string;
  selectedUser: User;
  listMessages: Message[] = [];
  messageForm = this.formBuilder.group({
    message: ['', Validators.required]
  });
  currentUser: User;

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private socket: Socket
  ) { }


  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.activeRoute.paramMap.subscribe(
      (data: ParamMap) => {
        this.selectedUserId = data.get('id');
        this.getUserById();
        this.getMessages();
        this.listenOnMessages();
      }
    );
  }

  getMessages() {
    this.messageService.getMessages(this.currentUser._id, this.selectedUserId)
      .subscribe(data => {
        this.listMessages = data.data ;
      }, err => {
        console.log(err);

      });
  }

  listenOnMessages() {
    this.socket.on('msg:' + this.currentUser._id + ':' + this.selectedUserId, (message) => {
      console.log('Message recvd', message);
      this.listMessages.push(message);
    });
    this.socket.on('sent:' + this.currentUser._id + ':' + this.selectedUserId, (message) => {
      console.log('Message Sent', message);
      this.listMessages.push(message);
    });
  }


  getUserById() {
    this.userService.getUserById(this.selectedUserId)
      .subscribe(data => {
        this.selectedUser = data.data;
      }, err => {
        console.log(err);
      });
  }


  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  sendMessage() {
    // tslint:disable-next-line:prefer-const
    let message = {} as Message;
    message.fromId = this.currentUser._id;
    message.toId = this.selectedUserId;
    message.message = this.messageForm.get('message').value;
    message.messageType = 0;
    this.messageService.sendMessage(message);
    this.messageForm.reset();
  }

}
