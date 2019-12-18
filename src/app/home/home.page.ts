import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: User;
  listProjects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.getManagerProjects();
  }

  getManagerProjects() {
    this.projectService.getManagerProjects(this.currentUser._id)
      .subscribe(data => {
        this.listProjects = data.data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
}
