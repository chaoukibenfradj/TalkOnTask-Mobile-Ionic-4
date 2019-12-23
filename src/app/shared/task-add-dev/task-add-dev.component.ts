import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-task-add-dev',
  templateUrl: './task-add-dev.component.html',
  styleUrls: ['./task-add-dev.component.scss'],
})
export class TaskAddDevComponent implements OnInit {

  @Input() oldPicked: User;
  @Input() projectId: string;

  listDev: User[] = [];
  choosedDestination = {} as User;
  constructor(
    public modalController: ModalController,
    private userService: UserService,
    private uiService: UIService,

  ) { }

  ngOnInit() {
    if (this.oldPicked && this.oldPicked._id) {
      this.choosedDestination = this.oldPicked;
    }

    this.getAllDevByProjectId();
  }

  getAllDevByProjectId() {
    this.uiService.startLoading();
    this.userService.getAllDevByProjectId(this.projectId).subscribe(data => {
      this.listDev = data.data;
      this.uiService.stopLoading();

    }, err => {
      this.uiService.stopLoading();
      this.dismissModal();
    });
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
      choosedDestination: this.choosedDestination
    });
  }

  addToDevList(item) {
    this.choosedDestination = item;
  }

  removeItemFromDevList(item) {
    this.choosedDestination = {} as User;
  }

  itemExistInList(id: string): boolean {
    return this.listDev.findIndex((element) => element._id === id) !== -1;
  }
}
