import { Project } from './../models/project.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddDevModalComponent } from '../shared/add-dev-modal/add-dev-modal.component';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ProjectService } from '../services/project.service';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.page.html',
  styleUrls: ['./project-add.page.scss'],
})
export class ProjectAddPage implements OnInit {

  addForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    estimated_start_date: ['', Validators.required],
    estimated_end_date: ['', Validators.required]
  });

  listDevTeam = [];

  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public authService: AuthService,
    private uiService: UIService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
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

  removeItemFromDevList(item) {
    this.listDevTeam.splice(this.listDevTeam.findIndex((element) => element._id === item._id), 1);
  }

  saveProject() {
    this.uiService.startLoading();
    const project = {} as Project;
    project.title = this.addForm.get('title').value;
    project.description = this.addForm.get('description').value;
    project.estimated_start_date = this.addForm.get('estimated_start_date').value;
    project.estimated_end_date = this.addForm.get('estimated_end_date').value;
    let listDevAsString = '';
    project.chef = this.currentUser._id;
    this.listDevTeam.forEach((element, index) => {
      listDevAsString += element._id + ':';
    });
    listDevAsString = listDevAsString.substring(0, listDevAsString.length - 1);
    project.devTeamId = listDevAsString;
    this.projectService.addProject(project)
      .subscribe(data => {
        console.log(data);
        this.uiService.stopLoading();
      }, err => {
        console.log(err);
        this.uiService.stopLoading();
      });
  }
}


