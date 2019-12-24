import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Project } from '../models/project.model';
import { Router } from '@angular/router';
import { UIService } from '../services/ui.service';
@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.page.html',
  styleUrls: ['./list-projects.page.scss'],
})
export class ListProjectsPage implements OnInit {
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
    if (this.currentUser && this.currentUser.userRole === 'pm') {
      this.getManagerProjects();
    } else {
      this.getDevProjects();
    }

  }

  getManagerProjects(event?) {
    this.uiService.startLoading();
    this.projectService.getManagerProjects(this.currentUser._id)
      .subscribe(data => {
        this.listProjects = data.data;
        (event) ? event.target.complete() : null;
        console.log(data);
        this.uiService.stopLoading();
      }, err => {
        this.uiService.stopLoading();
        (event) ? event.target.complete() : null;

        console.log(err);
      });
  }

  getDevProjects(event?) {
    this.uiService.startLoading();
    this.projectService.getDevProjects(this.currentUser._id)
      .subscribe(res => {
        this.listProjects = res.data;
        this.uiService.stopLoading();
        (event) ? event.target.complete() : null;
      }, err => {
        console.log(err);
        this.uiService.stopLoading();
        (event) ? event.target.complete() : null;
      });

  }

  gotoProjectDetails(id) {
    this.router.navigate(['/project-see/' + id]);
  }

  doRefresh(event) {
    if (this.currentUser && this.currentUser.userRole === 'pm') {
      this.getManagerProjects(event);
    } else {
      this.getDevProjects(event);
    }
  }
}


