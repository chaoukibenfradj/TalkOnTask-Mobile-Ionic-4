import { TaskService } from './../services/task.service';
import { Task } from './../models/task.model';
import { ProjectService } from './../services/project.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Form } from '@angular/forms';
import { User } from '../models/user.model';
import { AddDevModalComponent } from '../shared/add-dev-modal/add-dev-modal.component';

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
    end_date: ['', Validators.required],
  });

  listProject = [];
  listDevTeam = [];
  currentUser: User;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public modalController: ModalController,
              private projectService: ProjectService,
              private taskService: TaskService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.getProjects();
  }

  async addDevMember() {
    const modal = await this.modalController.create({
      component: AddDevModalComponent,
      componentProps: {
        listDevFromParent: this.listDevTeam
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      this.listDevTeam = data.listDev;
    }
  }

  getProjects() {
    this.projectService.getAllProjects().subscribe(res => {
      this.listProject = res.data;
    }, err => {
      console.log(err);
    });
  }

  removeItemFromDevList(item) {
    this.listDevTeam.splice(this.listDevTeam.findIndex((element) => { return element._id === item._id }), 1);
  }

  saveTask() {
    let task = {} as Task;
    task.taskTitle = this.addForm.get('taskTitle').value;
    task.taskDescription = this.addForm.get('taskDescription').value;
    task.start_date = this.addForm.get('start_date').value;
    task.end_date = this.addForm.get('end_date').value;
    task.projectId = this.addForm.get('projectId').value;
    let listDevAsString = '';
    this.listDevTeam.forEach((element, index) => {
      listDevAsString += element._id + ':';
    });
    listDevAsString = listDevAsString.substring(1, listDevAsString.length - 1);
    task.devTeamId = listDevAsString;
    this.taskService.addTask(task).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

}
