import { PipesModule } from './../utils/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ListMeetingsPageRoutingModule } from './list-meetings-routing.module';

import { ListMeetingsPage } from './list-meetings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    ListMeetingsPageRoutingModule
  ],
  declarations: [ListMeetingsPage]
})
export class ListMeetingsPageModule {}
