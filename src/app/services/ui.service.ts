import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
})
export class UIService {

    loadingInstance;
    isLoading = false;

    constructor(private loadingController: LoadingController, private toastController: ToastController) {
    }

    async startLoading(message?) {
        this.isLoading = true;
        return await this.loadingController.create({
            message: (message) ? message : 'Please wait ...',
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

    async showToast(message) {
        const toast = await this.toastController.create({
            message,
            duration: 3000,
            animated: true,
            mode: 'ios',
            position: 'bottom',
            showCloseButton: true,
        });
        await toast.present();
    }
}
