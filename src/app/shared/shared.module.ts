import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDevModalComponent } from './add-dev-modal/add-dev-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AddDevModalComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [AddDevModalComponent]
})
export class SharedModule { }
