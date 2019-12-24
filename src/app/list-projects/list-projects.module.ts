import { PipesModule } from './../utils/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListProjectsPage } from './list-projects.page';

const routes: Routes = [
  {
    path: '',
    component: ListProjectsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListProjectsPage]
})
export class ListProjectsPageModule {}
