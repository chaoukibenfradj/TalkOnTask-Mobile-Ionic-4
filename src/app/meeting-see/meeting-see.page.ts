import { Meeting } from './../models/meeting.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UIService } from '../services/ui.service';
import { MeetingService } from '../services/meeting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-meeting-see',
  templateUrl: './meeting-see.page.html',
  styleUrls: ['./meeting-see.page.scss'],
})
export class MeetingSeePage implements OnInit , AfterViewInit {

  meetingId: string;
  currentmeeting: Meeting;
  currentuser: User;


  constructor(
    private uiService: UIService,
    private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      this.meetingId = data.get('id');
      console.log('Params passed through routing=>', this.meetingId);
      this.seeMeeting();
      this.currentuser = this.authService.getUser();
    });
  }
  seeMeeting() {
    this.uiService.startLoading();
    this.meetingService.seeMeeting(this.meetingId)
      .subscribe(data => {
        this.currentmeeting = data.data;
        console.log(data);
        this.uiService.stopLoading();
      }, err => {
        console.log(err);
        this.uiService.stopLoading();
      });
  }

  gotoProjectDetails(id) {
    this.router.navigate(['/project-see/' + id]);
  }

}
