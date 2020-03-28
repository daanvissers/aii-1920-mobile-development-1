import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth,
              private toast: ToastService) { }

  auth: any;

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        user.email, user.password
      );
      console.log(result);
      this.subscribe();
      return result;
    }
    catch(e) {
      // Catch errors and show them in a toast to the user
      console.error(e);
      this.toast.presentToast(e, 3000);
    }
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email, user.password
      );
      console.log(result);
    }
    catch(e) {
      // Catch errors and show them in a toast to the user
      console.error(e);
      this.toast.presentToast(e, 3000);
    }
  }

  subscribe() {
    this.afAuth.authState.subscribe(auth => {
      console.log(auth);
      this.auth = auth;
    })
  }
}
