import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatFriendsListPage } from './chat-friends-list.page';
import { ShortenStringPipe } from 'src/pipes/shorten.pipe';
import { PipesModule } from '../utils/pipes.module';

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
    RouterModule.forChild(routes)
  ],
  declarations: [ChatFriendsListPage]
})
export class ChatFriendsListPageModule {}
