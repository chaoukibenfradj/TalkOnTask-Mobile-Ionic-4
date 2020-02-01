import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Response } from '../models/response.model';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController, Platform, Events } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
import { User } from '../models/user.model';
import { UIService } from '../services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  showPassword = false;
  showLoginForm = false;
  currentUser: User = null;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController,
    private platform: Platform,
    private fcm: FCM,
    private events: Events,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.uiService.startLoading('Checking your login information ...');
  }
  ionViewDidEnter() {
    console.log('Login');
    this.menuController.enable(false);
    if (this.authService.isTokenValid()) {
      this.userService.getUserById(this.authService.getUser()._id)
        .subscribe((data => {
          this.currentUser = data.data;
          this.authService.saveUser(this.currentUser);
          this.publishCurrentUser();
          this.uiService.stopLoading();
          this.menuController.enable(true);
          this.getNotificationToken();
          if (this.currentUser.userRole === 'client') {
            this.router.navigate(['/client-projects']);
          } else {
            this.router.navigate(['/list-projects']);
          }
        }), err => {
          console.log(err);
          this.uiService.stopLoading();
        });
    } else {
      this.menuController.enable(false);
      this.uiService.stopLoading();
      this.showLoginForm = true;
    }
  }
  ngAfterViewInit() {

  }

  showPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  getNotificationToken() {
    this.platform.ready().then(() => {
      this.fcm.getToken().then(token => {
        console.log('Get The Token =>', token);
        console.log('this is the current User : ', this.currentUser);
        console.log('typeof:', typeof (this.currentUser.fcmToken));
        console.log('Is diff : ', this.currentUser.fcmToken !== token);
        if (typeof (this.currentUser.fcmToken) === 'undefined' || this.currentUser.fcmToken !== token) {
          this.updateUserToken(token);
        }
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log('Get The Refresh Token =>', token);
        if (typeof (this.currentUser.fcmToken) === 'undefined' || this.currentUser.fcmToken !== token) {
          this.updateUserToken(token);
        }
      });
    });
  }

  publishCurrentUser() {
    this.events.publish('currentUser', this.currentUser);
  }

  updateUserToken(token) {
    this.userService.updateFCMToken(this.currentUser._id, token)
      .subscribe(() => {
        console.log('Notif token setted !');
        this.uiService.stopLoading();
      }, err => {
        console.log('Update Token error :', err);
        this.uiService.stopLoading();
      });
  }

  onLogin() {
    this.uiService.startLoading();
    this.showLoginForm = true;
    this.userService.loginUser(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    ).subscribe((data: Response) => {
      const decoded = jwt_decode(data.data);
      this.authService.saveToken(data.data);
      this.authService.saveUser(decoded.user);
      this.menuController.enable(true);
      this.currentUser = decoded.user;
      this.publishCurrentUser();
      this.getNotificationToken();
      if (this.currentUser.userRole === 'client') {
        this.router.navigate(['/client-projects']);
      } else {
        this.router.navigate(['/list-projects']);
      }
      this.uiService.stopLoading();
    }, err => {
      this.uiService.stopLoading();
      this.menuController.enable(false);
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    });
  }

}
