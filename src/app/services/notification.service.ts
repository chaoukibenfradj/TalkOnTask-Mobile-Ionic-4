import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private fcm: FCM,
        private router: Router,
        private events: Events
    ) {
        console.log('cc');

    }

    waitNotifi() {
        this.events.subscribe('currentUser', () => {
            this.notificationTapped();
        });
    }

    notificationTapped() {
        this.fcm.onNotification().subscribe(notifcationData => {
            if (notifcationData.wasTapped) {
                switch (notifcationData.notifType) {
                    case 'task':
                        this.router.navigate(['task-details/' + notifcationData.taskId]);
                        break;

                    default:
                        break;
                }
            } else {
                // alert(JSON.stringify(data));
            }

        });
    }
}
