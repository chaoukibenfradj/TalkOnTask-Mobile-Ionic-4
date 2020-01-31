import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingSeePage } from './meeting-see.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingSeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingSeePageRoutingModule {}
