import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UIService } from '../services/ui.service';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-projects',
  templateUrl: './client-projects.page.html',
  styleUrls: ['./client-projects.page.scss'],
})
export class ClientProjectsPage implements OnInit {

  listProposition: [] = [];
  currentUser: User;
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    if (this.currentUser.userRole === 'client') {
      this.getPropositions();
    } else {
      this.getAllProp();
    }
  }

  getAllProp(event?) {
    this.uiService.startLoading();
    this.projectService.getAllPropositions()
      .subscribe(data => {
        console.log(data);
        (event) ? event.target.complete() : null;
        this.listProposition = data.data;
      }, err => {
        (event) ? event.target.complete() : null;
        console.log(err);
      });
  }

  getPropositions(event?) {
    this.uiService.startLoading();
    this.projectService.getClientPropositionsById(this.currentUser._id)
      .subscribe(data => {
        console.log(data);
        (event) ? event.target.complete() : null;
        this.listProposition = data.data;
      }, err => {
        (event) ? event.target.complete() : null;
        console.log(err);
      });
  }

  gotoProjectDetails(id) {
    this.router.navigate(['/client-propositions-details/' + id]);
  }

  doRefresh(event) {
    if (this.currentUser.userRole === 'client') {
      this.getPropositions(event);
    } else {
      this.getAllProp(event);
    }
  }

}
