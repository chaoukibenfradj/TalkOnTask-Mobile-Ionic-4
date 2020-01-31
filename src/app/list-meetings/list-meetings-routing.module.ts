import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMeetingsPage } from './list-meetings.page';

const routes: Routes = [
  {
    path: '',
    component: ListMeetingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMeetingsPageRoutingModule {}
