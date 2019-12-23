import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/project.model';
import { Router } from '@angular/router';
import { UIService } from '../services/ui.service';

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
    private authService: AuthService,
    private router: Router,
    private uiService: UIService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.getManagerProjects();
  }

  getManagerProjects() {
    this.uiService.startLoading();
    this.projectService.getManagerProjects(this.currentUser._id)
      .subscribe(data => {
        this.listProjects = data.data;
        console.log(data);
        this.uiService.stopLoading();
      }, err => {
        this.uiService.stopLoading();
        console.log(err);
      });
  }

  gotoProjectDetails(id) {
    this.router.navigate(['/project-see/' + id]);
  }
}
