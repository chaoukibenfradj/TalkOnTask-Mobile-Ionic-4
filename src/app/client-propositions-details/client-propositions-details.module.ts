import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPropositionsDetailsPageRoutingModule } from './client-propositions-details-routing.module';

import { ClientPropositionsDetailsPage } from './client-propositions-details.page';
import { PipesModule } from '../utils/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    ClientPropositionsDetailsPageRoutingModule
  ],
  declarations: [ClientPropositionsDetailsPage]
})
export class ClientPropositionsDetailsPageModule {}
