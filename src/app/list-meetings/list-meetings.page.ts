import { Meeting } from './../models/meeting.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../models/user.model';
import { MeetingService } from '../services/meeting.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-list-meetings',
  templateUrl: './list-meetings.page.html',
  styleUrls: ['./list-meetings.page.scss'],
})
export class ListMeetingsPage implements OnInit, AfterViewInit {

  currentUser: User;
  listMeetings: Meeting[] = [];

  constructor(
    private meetingService: MeetingService,
    private authService: AuthService,
    private router: Router,
    private uiService: UIService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.currentUser = this.authService.getUser();
    if (this.currentUser && this.currentUser.userRole === 'pm') {
      this.getManagerProjects();
    } else {
      this.getDevMeetings();
    }
  }

  getManagerProjects(event?) {
    this.uiService.startLoading();
    this.meetingService.getManagerProjects(this.currentUser._id)
      .subscribe(data => {
        this.listMeetings = data.data;
        (event) ? event.target.complete() : null;
        console.log(data);
        this.uiService.stopLoading();
      }, err => {
        this.uiService.stopLoading();
        (event) ? event.target.complete() : null;

        console.log(err);
      });
  }

  getDevMeetings(event?) {
    this.uiService.startLoading();
    this.meetingService.getDevMeetings(this.currentUser._id)
      .subscribe(res => {
        this.listMeetings = res.data;
        this.uiService.stopLoading();
        (event) ? event.target.complete() : null;
      }, err => {
        console.log(err);
        this.uiService.stopLoading();
        (event) ? event.target.complete() : null;
      });

  }

  gotoMeetingDetails(id) {
    this.router.navigate(['/meeting-see/' + id]);
  }

  doRefresh(event) {
    if (this.currentUser && this.currentUser.userRole === 'pm') {
      this.getManagerProjects(event);
    } else {
      this.getDevMeetings(event);
    }
  }

}
