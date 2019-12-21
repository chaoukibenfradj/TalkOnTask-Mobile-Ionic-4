import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatPickDestinationComponent } from '../chat-pick-destination/chat-pick-destination.component';
import { User } from 'src/app/models/user.model';
import { Message } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat-create-message',
  templateUrl: './chat-create-message.component.html',
  styleUrls: ['./chat-create-message.component.scss'],
})
export class ChatCreateMessageComponent implements OnInit {

  choosedDestination = {} as User;
  messageText = '';
  currentUser: User;

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private messageService: MessageService,

  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }

  sendMessage() {
    // tslint:disable-next-line:prefer-const
    let message = {} as Message;
    message.fromId = this.currentUser._id;
    message.toId = this.choosedDestination._id;
    message.message = this.messageText;
    message.messageType = 0;
    this.messageService.sendMessage(message);
    this.dismissModal();
  }

  async pickDestination() {
    const modal = await this.modalController.create({
      component: ChatPickDestinationComponent,
      componentProps: {
        choosedDestination: this.choosedDestination
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      this.choosedDestination = data.choosedDestination;
    }
  }
  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
