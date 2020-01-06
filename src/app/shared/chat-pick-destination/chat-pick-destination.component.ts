import { User } from 'src/app/models/user.model';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-chat-pick-destination',
  templateUrl: './chat-pick-destination.component.html',
  styleUrls: ['./chat-pick-destination.component.scss'],
})
export class ChatPickDestinationComponent implements OnInit, AfterViewInit {


  @Input() oldPicked: User;

  listDev: User[] = [];
  choosedDestination = {} as User;
  constructor(
    public modalController: ModalController,
    private userService: UserService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.uiService.startLoading();

  }

  ngAfterViewInit(): void {

  }

  ionViewDidEnter() {
    if (this.oldPicked && this.oldPicked._id) {
      this.choosedDestination = this.oldPicked;
    }
    this.getAllDev();
  }

  getAllDev() {
    this.userService.getAllUsers().subscribe(data => {
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
