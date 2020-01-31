import { Meeting } from './../models/meeting.model';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UIService } from '../services/ui.service';
import { MeetingService } from '../services/meeting.service';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-meeting-add',
  templateUrl: './meeting-add.page.html',
  styleUrls: ['./meeting-add.page.scss'],
})
export class MeetingAddPage implements OnInit {

  addForm = this.formBuilder.group({
    subject: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    duration: ['', Validators.required],
    selectedProject: ['', Validators.required],
  });

  listDevTeam = [];
  listProjects: Project[] = [];
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public authService: AuthService,
    private uiService: UIService,
    private meetingService: MeetingService,
    private projectService: ProjectService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.getManagerProjects();
  }



  saveMeeting() {
    this.uiService.startLoading();
    const meeting = {} as Meeting;
    meeting.subject = this.addForm.get('subject').value;
    meeting.description = this.addForm.get('description').value;
    meeting.date = this.addForm.get('date').value;
    meeting.duration = this.addForm.get('duration').value;
    meeting.chef = this.currentUser._id;
    meeting.selectedProject = this.addForm.get('selectedProject').value;
    console.log(meeting);
    this.meetingService.addMeeting(meeting)
      .subscribe(data => {
        console.log(meeting);
        this.uiService.stopLoading();
        this.location.back();

      }, err => {
        console.log(err);
        this.uiService.stopLoading();
      });
  }

  getManagerProjects(event?) {
    this.uiService.startLoading();
    this.projectService.getManagerProjects(this.currentUser._id)
      .subscribe(data => {
        this.listProjects = data.data;
        (event) ? event.target.complete() : null;
        console.log(data);
        console.log('heyyyyyyyyyy');
        console.log(this.listProjects);
        this.uiService.stopLoading();
      }, err => {
        this.uiService.stopLoading();
        (event) ? event.target.complete() : null;

        console.log(err);
      });
  }

}
