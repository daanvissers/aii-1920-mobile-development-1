import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration
    });
    await toast.present();
  }
}
