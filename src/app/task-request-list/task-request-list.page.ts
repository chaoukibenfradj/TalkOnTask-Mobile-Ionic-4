import { CapitalizePipe } from 'src/pipes/capitalize.pipe';
import { Component, OnInit } from '@angular/core';
import { TaskRequest } from '../models/task-request.model';
import { UIService } from '../services/ui.service';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { User } from '../models/user.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-task-request-list',
  templateUrl: './task-request-list.page.html',
  styleUrls: ['./task-request-list.page.scss'],
})
export class TaskRequestListPage implements OnInit {

  listTaskReq: TaskRequest[] = [];
  currentUser: User;
  actionSheetShowed = false;
  constructor(
    private uiService: UIService,
    private authService: AuthService,
    private taskService: TaskService,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.loadReqTasks();
  }

  loadReqTasks(event?) {
    if (this.currentUser.userRole === 'dev') {
      this.getTaskByDevId(event);
    }
  }

  dateDiffAsInt(date): number {
    return (moment(date).diff(moment(new Date())));
  }

  getTaskByDevId(event?) {
    this.uiService.startLoading();
    this.taskService.getTaskReqByDevId(this.currentUser._id)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line:no-unused-expression
        (event) ? event.target.complete() : null;
        this.listTaskReq = data.data;
        this.uiService.stopLoading();
      }, err => {
        this.uiService.stopLoading();
        console.log(err);
      });
  }

  doRefresh(event) {
    this.loadReqTasks(event);
  }

  deleteTaskReq(item) {
    this.uiService.startLoading();
    this.taskService.deleteTaskReq(item._id).subscribe(data => {
      this.uiService.showToast('Request has been deleted !');
      this.uiService.stopLoading();
      this.loadReqTasks();
    }, err => {
      this.uiService.showToast('Error occured, please try again !');
      this.uiService.stopLoading();
      console.log(err);
    });
  }

  acceptTaskReq(item) {
    this.uiService.startLoading();
    this.taskService.acceptTaskReq(item._id).subscribe(data => {
      this.uiService.showToast('Request has been accepted !');
      this.uiService.stopLoading();
      this.loadReqTasks();
    }, err => {
      this.uiService.showToast('Error occured, please try again !');
      this.uiService.stopLoading();
      console.log(err);
    });
  }

  dateDiff(date): string {
    const a = moment(date);
    const b = moment(new Date());
    const mins = a.diff(b, 'minutes');
    const hours = a.diff(b, 'hours');
    const days = a.diff(b, 'days');
    if (days === 0) {
      if (hours === 0) {
        return Math.abs(mins) + ' minutes';
      } else {
        return Math.abs(hours) + ' hours';
      }
    } else {
      return Math.abs(days) + ' days';
    }
  }
  gotoChat(item) {
    this.router.navigate(['/chat-list-messages/' + item.devId._id]);
  }
  async showMenu(item) {
    const capitalizePipe = new CapitalizePipe();
    if (!this.actionSheetShowed) {
      this.actionSheetShowed = true;
      const actionSheet = await this.actionSheetController.create({
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
        mode: 'md',
        header: 'Options',
        buttons: [{
          text: `Chat with ${capitalizePipe.transform(item.devId.firstName + ' ' + item.devId.lastName)}`,
          icon: 'chatboxes',
          handler: () => {
            this.gotoChat(item);
            this.actionSheetShowed = false;
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.actionSheetShowed = false;
          }
        }]
      });
      await actionSheet.present();
    }

  }
}
