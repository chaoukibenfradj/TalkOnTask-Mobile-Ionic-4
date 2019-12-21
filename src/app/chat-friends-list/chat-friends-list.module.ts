import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatFriendsListPage } from './chat-friends-list.page';
import { ShortenStringPipe } from 'src/pipes/shorten.pipe';
import { PipesModule } from '../utils/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ChatCreateMessageComponent } from '../shared/chat-create-message/chat-create-message.component';
import { ChatPickDestinationComponent } from '../shared/chat-pick-destination/chat-pick-destination.component';

const routes: Routes = [
  {
    path: '',
    component: ChatFriendsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatFriendsListPage],
  entryComponents : [ChatCreateMessageComponent, ChatPickDestinationComponent]
})
export class ChatFriendsListPageModule {}
