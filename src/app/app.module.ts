import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './utils/guards/auth-guard.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { API_URL } from './utils/API_URLS';
import { IonicGestureConfig } from './utils/IonicGestureConfig';
import { FCM } from '@ionic-native/fcm/ngx';
import { NotificationService } from './services/notification.service';


const config: SocketIoConfig = { url: API_URL, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [
    StatusBar,
    FCM,
    AuthGuardService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
