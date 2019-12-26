import { Component } from '@angular/core';

import { Platform, MenuController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/user.model';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
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
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.events.subscribe('currentUser', (user) => {
        this.currentUser = user ;
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

  getUserType(userType): string {
    switch (userType) {
      case 'pm':
        return 'Project Manager';
        break;
      case 'dev':
        return 'Developer';
        break;
      default:
        break;
    }
  }
}
