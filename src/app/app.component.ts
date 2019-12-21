import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { Socket } from 'ngx-socket-io';

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
      title: 'List',
      url: '/list',
      icon: 'list'
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
    private authService: AuthService,
    private socket: Socket
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.currentUser = this.authService.getUser();
      console.log(this.currentUser);

      this.socket.on('test', () => {
        console.log('Recieved MSG');
      })

    });

  }

  getUserType(userType): string {
    switch (userType) {
      case 'pm':
        return 'Project Manager'
        break;
      case 'dev':
        return 'Developper';
        break;
      default:
        break;
    }
  }
}
