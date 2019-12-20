import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectAddPage } from './project-add.page';
import { SharedModule } from '../shared/shared.module';
import { AddDevModalComponent } from '../shared/add-dev-modal/add-dev-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents : [
    AddDevModalComponent
  ],
  declarations: [ProjectAddPage], 
})
export class ProjectAddPageModule {}
