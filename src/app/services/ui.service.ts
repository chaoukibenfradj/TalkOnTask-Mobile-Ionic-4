import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
})
export class UIService {

    loadingInstance;
    isLoading = false;

    constructor(public loadingController: LoadingController) {
    }

    async startLoading() {
        this.isLoading = true;
        return await this.loadingController.create({
            message: 'Please wait ...',
            animated: true,
            keyboardClose: true,
            spinner: 'crescent',
            showBackdrop: true,
            mode: 'ios',
            backdropDismiss: false
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort laoding'));
                }
            });
        });
    }

    async stopLoading() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => { });
    }

}
