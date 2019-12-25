import { PipesModule } from './../utils/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaskRequestListPage } from './task-request-list.page';
import { LongPressModule } from 'ionic-long-press';

const routes: Routes = [
  {
    path: '',
    component: TaskRequestListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    LongPressModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskRequestListPage]
})
export class TaskRequestListPageModule {}
