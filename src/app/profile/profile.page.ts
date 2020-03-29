import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Profile } from '../interfaces/profile';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Observable } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;
  profile = {} as Profile;

  profileData: Observable<any>;

  titles = [
    { text: "Strong", value: "strong" },
    { text: "Cool", value: "cool" },
    { text: "Suspicious", value: "suspicious" },
    { text: "Amazing", value: "amazing" },
    { text: "Special", value: "special" }
  ];
  trainers = [
    { text: "Ace Trainer ♂", value: "acetrainerm" },
    { text: "Ace Trainer ♀", value: "acetrainerf" },
    { text: "Aroma Lady", value: "aromalady" },
    { text: "Battle Girl", value: "battlegirl" },
    { text: "Beauty", value: "beauty" },
    { text: "Bird Keeper", value: "birdkeeper" },
    { text: "Blackbelt", value: "blackbelt" },
    { text: "Bug Catcher", value: "bugcatcher" },
    // TODO: Add all R/S Trainer values
  ];

  constructor(public afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase,
              private router: Router,
              private auth: AuthenticationService,
              private picker: PickerController,
              private toast: ToastService) { }

  ngOnInit() {
  }

  async login() {
    // Log user in via Auth-service
    const result = await this.auth.login(this.user);
    console.log(result);

    if (result['user']) {
      // User has successfully logged in
      console.log("Logged in, " + result["user"]["uid"]);
      // Subscribe to userprofile data
      this.profileData = this.afDatabase.object(`profile/${result["user"]["uid"]}`).valueChanges();
      this.profileData.subscribe(profile => {
        this.profile = profile;
        console.log("Loaded profile:");
        console.log(profile);
      })
      // Refresh page
      this.router.navigate(['/tabs/profile']);
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

  createProfile() {
      // Access /profile node and push profile
      console.log("Pushing to profile: " + this.auth.auth.uid);
      // Set the object in the Firebase Database (just one)
      this.afDatabase.object(`profile/${this.auth.auth.uid}`).set(this.profile)
        .then(() => this.router.navigate(['/tabs/profile']));
      // Notify end-user
      this.toast.presentToast("Your profile has successfully been updated!", 3000);
  }

  async showMultiColumnPicker() {
    let options: PickerOptions = {
      cssClass: 'profile-titlepicker',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'profile-titlepicker-cancel'
        },
        {
          text: 'Done',
          cssClass: 'profile-titlepicker-done'
        }
      ],
      columns: [
        {
          name: 'Title',
          options: this.titles,
        },
        {
          name: 'Trainer',
          options: this.trainers,
        }
      ]
    }
    let picker = await this.picker.create(options);
    picker.present();

    // When the picker is dismissed again
    picker.onDidDismiss().then(async data => {
      let title = await picker.getColumn('Title');
      let trainer = await picker.getColumn('Trainer');
      this.profile.title = title.options[title.selectedIndex].text;
      this.profile.trainer = trainer.options[trainer.selectedIndex].value;
    });
  }

}
