import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';
import { ModalController } from '@ionic/angular';
import { ChatCreateMessageComponent } from '../shared/chat-create-message/chat-create-message.component';
import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';
@Component({
  selector: 'app-chat-friends-list',
  templateUrl: './chat-friends-list.page.html',
  styleUrls: ['./chat-friends-list.page.scss'],
})
export class ChatFriendsListPage implements OnInit {

  listUsers: Message[] = [];
  currentUser: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private modalController: ModalController,
    private messageService: MessageService,
    private socket: Socket
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.getLastMessage();
    this.listenOnLastMessages();
  }

  listenOnLastMessages() {
    this.socket.on('lastMessage:' + this.currentUser._id, (message) => {
      console.log(message);
      const index = this.listUsers.findIndex((element) => {
        if (
          (element.fromId._id === message.message.fromId._id && element.toId._id === message.message.toId._id)
          ||
          (element.toId._id === message.message.fromId._id && element.fromId._id === message.message.toId._id)
        ) {
          return true;
        }
      });
      console.log(index);
      if (index !== -1) {
        this.listUsers.splice(index, 1);
      }
      this.listUsers.push(message.message);
      this.sortArrayList();
    });
  }
  sortArrayList() {
    this.listUsers = this.listUsers.sort((a, b) => moment(b.sentDate).diff(moment(a.sentDate)));
  }

  // getUsers() {
  //   this.userService.getAllUsers()
  //     .subscribe(data => {
  //       this.listUsers = data.data;
  //       this.listUsers.splice(this.listUsers.findIndex((element) => element._id === this.currentUser._id), 1);
  //     }, err => {
  //       console.log(err);
  //     });
  // }

  getLastMessage(event?) {
    this.messageService.getLastMessages(this.currentUser._id)
      .subscribe(data => {
        console.log(data);
        this.listUsers = data.data;
        // tslint:disable-next-line:no-unused-expression
        (event) ? event.target.complete() : null;
      }, err => {
        console.log(err);
      });
  }

  getMessages(item) {
    if (item.fromId._id === this.currentUser._id) {
      this.router.navigate(['/chat-list-messages/' + item.toId._id]);
    } else {
      this.router.navigate(['/chat-list-messages/' + item.fromId._id]);
    }
  }

  doRefresh(event) {
    this.getLastMessage(event);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ChatCreateMessageComponent,
      componentProps: {
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
    }
  }

}
