import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-dev-modal',
  templateUrl: './add-dev-modal.component.html',
  styleUrls: ['./add-dev-modal.component.scss'],
})
export class AddDevModalComponent implements OnInit {

  @Input() listDevFromParent: User[];

  listDev: User[] = [];
  listDevFromServer: User[] = [];
  constructor(
    public modalController: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.listDev = this.listDevFromParent ;
    this.getAllDev();
  }

  getAllDev() {
    this.userService.getAllUserByType('dev').subscribe(data => {
      this.listDevFromServer = data.data;
    }, err => {
      this.dismissModal();
    })
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true, 
      'listDev' : this.listDev
    });
  }
  addToDevList(item) {
    this.listDev.push(item);
    console.log(this.listDev);
  }

  removeItemFromDevList(item) {
    this.listDev.splice(this.listDev.findIndex((element) => { return element._id == item._id }), 1);
    console.log(this.listDev);
  }

  itemExistInList(id: string): boolean {
    return this.listDev.findIndex((element) => { return element._id == id }) != -1;
  }

}
