import { TaskService } from './../services/task.service';
import { Task } from './../models/task.model';
import { ModalController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Form } from '@angular/forms';
import { User } from '../models/user.model';
import { TaskAddDevComponent } from '../shared/task-add-dev/task-add-dev.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.page.html',
  styleUrls: ['./task-add.page.scss'],
})
export class TaskAddPage implements OnInit {

  addForm = this.formBuilder.group({
    taskTitle: ['', Validators.required],
    taskDescription: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required]
  });

  listDevTeam = [];
  selectedProject: string;
  choosedDev: User;
  currentUser: User;

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
      this.selectedProject = data.get('idProject');
    });
  }

  async addDevMember() {
    const modal = await this.modalController.create({
      component: TaskAddDevComponent,
      componentProps: {
        projectId: this.selectedProject,
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

  saveTask() {
    this.uiService.startLoading();
    const task = {} as Task;
    task.taskTitle = this.addForm.get('taskTitle').value;
    task.taskDescription = this.addForm.get('taskDescription').value;
    task.start_date = this.addForm.get('start_date').value;
    task.end_date = this.addForm.get('end_date').value;
    task.devId = this.choosedDev._id;
    task.projectId = this.selectedProject;
    console.log(task);
    this.taskService.addTask(task).subscribe(data => {
      console.log(data);
      this.uiService.stopLoading();
      this.location.back();
    }, err => {
      console.log(err);
      this.uiService.stopLoading();

    });
  }

}
