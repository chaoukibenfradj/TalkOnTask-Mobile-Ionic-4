import { PipesModule } from './../utils/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectSeePage } from './project-see.page';
import { SharedModule } from '../shared/shared.module';
import { TaskAddDevComponent } from '../shared/task-add-dev/task-add-dev.component';
import { LongPressModule } from 'ionic-long-press';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
  {
    path: '',
    component: ProjectSeePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgxChartsModule,
    PipesModule,
    LongPressModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [TaskAddDevComponent],
  declarations: [ProjectSeePage]
})
export class ProjectSeePageModule { }
