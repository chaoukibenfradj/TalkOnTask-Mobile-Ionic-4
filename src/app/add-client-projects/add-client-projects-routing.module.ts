import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClientProjectsPage } from './add-client-projects.page';

const routes: Routes = [
  {
    path: '',
    component: AddClientProjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClientProjectsPageRoutingModule {}
