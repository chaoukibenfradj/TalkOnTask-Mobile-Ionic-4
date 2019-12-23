import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaskAddPage } from './task-add.page';
import { SharedModule } from '../shared/shared.module';
import { AddDevModalComponent } from '../shared/add-dev-modal/add-dev-modal.component';
import { TaskAddDevComponent } from '../shared/task-add-dev/task-add-dev.component';

const routes: Routes = [
  {
    path: '',
    component: TaskAddPage
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
  entryComponents : [
    TaskAddDevComponent
  ],
  declarations: [TaskAddPage]
})
export class TaskAddPageModule {}
