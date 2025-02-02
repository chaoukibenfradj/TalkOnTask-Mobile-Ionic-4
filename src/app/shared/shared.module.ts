import { ChatCreateMessageComponent } from './chat-create-message/chat-create-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDevModalComponent } from './add-dev-modal/add-dev-modal.component';
import { IonicModule } from '@ionic/angular';
import { ChatPickDestinationComponent } from './chat-pick-destination/chat-pick-destination.component';
import { PipesModule } from '../utils/pipes.module';
import { FormsModule } from '@angular/forms';
import { TaskAddDevComponent } from './task-add-dev/task-add-dev.component';

@NgModule({
  declarations: [AddDevModalComponent, ChatCreateMessageComponent, ChatPickDestinationComponent, TaskAddDevComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule
  ],
  exports: [AddDevModalComponent, ChatCreateMessageComponent, ChatPickDestinationComponent, TaskAddDevComponent]
})
export class SharedModule { }
