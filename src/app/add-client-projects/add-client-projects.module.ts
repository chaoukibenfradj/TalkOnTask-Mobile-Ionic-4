import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClientProjectsPageRoutingModule } from './add-client-projects-routing.module';

import { AddClientProjectsPage } from './add-client-projects.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    AddClientProjectsPageRoutingModule
  ],
  declarations: [AddClientProjectsPage]
})
export class AddClientProjectsPageModule {}
