import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaskUpdatePage } from './task-update.page';
import { SharedModule } from '../shared/shared.module';
import { TaskAddDevComponent } from '../shared/task-add-dev/task-add-dev.component';

const routes: Routes = [
  {
    path: '',
    component: TaskUpdatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    TaskAddDevComponent
  ],
  declarations: [TaskUpdatePage]
})
export class TaskUpdatePageModule { }
