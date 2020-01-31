import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientProjectsPageRoutingModule } from './client-projects-routing.module';

import { ClientProjectsPage } from './client-projects.page';
import { PipesModule } from '../utils/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    ClientProjectsPageRoutingModule
  ],
  declarations: [ClientProjectsPage]
})
export class ClientProjectsPageModule {}
