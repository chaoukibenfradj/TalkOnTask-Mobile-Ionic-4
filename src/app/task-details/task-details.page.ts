import { ActivatedRoute } from '@angular/router';
import { TaskService } from './../services/task.service';
import { Task } from './../models/task.model';
import { Component, OnInit } from '@angular/core';
import { UIService } from '../services/ui.service';
import { ToastController } from '@ionic/angular';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  currentTaskId: string;
  currentTask: Task;
  isUpdating = false;
  newTaskState: string;
  currentUser: User;
  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.activatedRoute.paramMap.subscribe(data => {
      this.currentTaskId = data.get('idTask');
      this.getTaskById();
    });

  }

  getTaskById() {
    this.uiService.startLoading();
    this.taskService.getTaskById(this.currentTaskId).subscribe((data) => {
      this.currentTask = data.data;
      console.log(this.currentTask);
      this.uiService.stopLoading();
    }, err => {
      console.log(err);
      this.uiService.stopLoading();
    });
  }
  stateChanged(event) {
    this.newTaskState = event.detail.value;
  }

  changeTaskState() {
    if (this.currentTask.state !== this.newTaskState) {
      this.uiService.startLoading();
      this.taskService.updateTaskState(this.currentTaskId, this.newTaskState)
        .subscribe(async (data) => {
          console.log(data);
          this.isUpdating = false;
          this.currentTask.state = this.newTaskState;
          const toast = await this.toastController.create({
            message: `Task state updated to ${this.stateName(this.newTaskState)}`,
            duration: 3000,
            animated: true,
            mode: 'ios',
            position: 'bottom',
            showCloseButton: true,
          });
          await toast.present();
          this.uiService.stopLoading();
        }, err => {
          console.log(err);
          this.uiService.stopLoading();
        });
    } else {
      console.log('Dont Update');
      this.isUpdating = false;
    }
  }

  updateToggle() {
    this.isUpdating = !this.isUpdating;
  }


  stateName(state): string {
    switch (state) {
      case 'todo':
        return 'To Do';
        break;
      case 'doing':
        return 'Doing';
        break;
      default:
        return 'Done';
        break;
    }
  }
}
