import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { MeetingAddPageRoutingModule } from './meeting-add-routing.module';

import { MeetingAddPage } from './meeting-add.page';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../utils/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule,
    PipesModule,
    MeetingAddPageRoutingModule
  ],
  declarations: [MeetingAddPage]
})
export class MeetingAddPageModule {}
