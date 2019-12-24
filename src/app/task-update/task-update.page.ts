import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { UIService } from '../services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { TaskAddDevComponent } from '../shared/task-add-dev/task-add-dev.component';
import { Task } from '../models/task.model';
import { Location } from '@angular/common';
import { checkChangedValues } from '../utils/misc/check-changed-values';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.page.html',
  styleUrls: ['./task-update.page.scss'],
})
export class TaskUpdatePage implements OnInit {

  updateForm: FormGroup;
  updateFormOldValue = {};

  listDevTeam = [];
  currentTaskId: string;
  choosedDev: User;
  currentUser: User;
  currentTask: Task;


  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public modalController: ModalController,
    private taskService: TaskService,
    private location: Location,
    private uiService: UIService,
    private activatedRoute: ActivatedRoute
  ) { }

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
      console.log('Selected Task =>', this.currentTask);
      this.uiService.stopLoading();
      this.updateForm = this.formBuilder.group({
        taskTitle: [this.currentTask.taskTitle, Validators.required],
        taskDescription: [this.currentTask.taskDescription, Validators.required],
        start_date: [this.currentTask.start_date, Validators.required],
        end_date: [this.currentTask.end_date, Validators.required]
      });
      this.updateFormOldValue = this.updateForm.value;
      this.choosedDev = this.currentTask.devId;
    }, err => {
      console.log(err);
      this.uiService.stopLoading();
    });
  }

  async addDevMember() {
    const modal = await this.modalController.create({
      component: TaskAddDevComponent,
      componentProps: {
        projectId: this.currentTask.projectId,
        oldPicked: this.choosedDev
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      this.choosedDev = data.choosedDestination;
    }
  }

  removeItemFromDevList(item) {
    this.choosedDev = null;
  }

  saveUpdate() {
    const obj = checkChangedValues(this.updateFormOldValue, this.updateForm.value);
    // tslint:disable-next-line:no-unused-expression
    (this.choosedDev._id !== this.currentTask.devId._id) ? obj.devId = this.choosedDev._id : null;
    console.log(obj);
    this.uiService.startLoading();
    this.taskService.updateTask(this.currentTaskId, obj).subscribe(data => {
      console.log(data);
      this.uiService.stopLoading();
      this.location.back();
    }, err => {
      console.log(err);
      this.uiService.stopLoading();
      this.location.back();
    });
  }

  invalidForm() {
    return (this.currentTask.devId._id === this.choosedDev._id)
      &&
      (JSON.stringify(checkChangedValues(this.updateForm.value, this.updateFormOldValue)) === '{}');
  }

}
