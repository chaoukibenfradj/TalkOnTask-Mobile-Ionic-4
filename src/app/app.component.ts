import { NotificationService } from './services/notification.service';
import { Component, AfterViewInit } from '@angular/core';

import { Platform, MenuController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/user.model';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Projects',
      url: '/list-projects',
      icon: 'apps'
    },
    {
      title: 'Task Requests',
      url: '/task-request-list',
      icon: 'hand'
    },
    {
      title: 'Profil',
      url: '/profil-details',
      icon: 'person'
    },
    {
      title: 'Chat',
      url: '/chat-friends-list',
      icon: 'chatboxes'
    },
    {
      title: 'Projects Propositions',
      url: '/client-projects',
      icon: 'apps'
    }
  ];

  public clientPages = [
    {
      title: 'Projects Propositions',
      url: '/client-projects',
      icon: 'apps'
    }
  ];
  currentUser: User;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private socket: Socket,
    private router: Router,
    private menuCtrl: MenuController,
    private events: Events,
    private notifService: NotificationService,
    private fcm: FCM
  ) {
    this.initializeApp();
    this.notifService.waitNotifi();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.events.subscribe('currentUser', (user) => {
        this.currentUser = user;
        if (this.currentUser.userRole === 'client') {
          this.appPages = this.clientPages;
        }
      });

      console.log(this.currentUser);
      this.socket.on('test', () => {
        console.log('Recieved MSG');
      });

    });
  }

  logOut() {
    localStorage.clear();
    this.menuCtrl.enable(false);
    this.router.navigate(['/login']);
  }

  ngAfterViewInit() {

  }

  getUserType(userType): string {
    switch (userType) {
      case 'pm':
        return 'Project Manager';
        break;
      case 'dev':
        return 'Developer';
        break;
      case 'client':
        return 'Client';
        break;
      default:
        break;
    }
  }
}
