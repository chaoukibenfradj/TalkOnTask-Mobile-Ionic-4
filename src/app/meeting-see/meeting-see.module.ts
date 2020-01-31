import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingSeePageRoutingModule } from './meeting-see-routing.module';

import { MeetingSeePage } from './meeting-see.page';
import { PipesModule } from '../utils/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    MeetingSeePageRoutingModule
  ],
  declarations: [MeetingSeePage]
})
export class MeetingSeePageModule {}
