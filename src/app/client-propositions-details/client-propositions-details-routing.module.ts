import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPropositionsDetailsPage } from './client-propositions-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPropositionsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPropositionsDetailsPageRoutingModule {}
