import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatListMessagesPage } from './chat-list-messages.page';
import { PipesModule } from '../utils/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ChatListMessagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatListMessagesPage]
})
export class ChatListMessagesPageModule {}
