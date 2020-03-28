import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Profile } from '../interfaces/profile';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;
  profile = {} as Profile;

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
  selected = ['Pokémon', 'Trainer', 'brendan'];

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private auth: AuthenticationService,
              private picker: PickerController) { }

  ngOnInit() {
  }

  async login() {
    const result = await this.auth.login(this.user);
    console.log(result);
    if (result['user']) {
      console.log("Logged in.");
      this.router.navigate(['/tabs/profile']);
    }
  }

  register() {
    this.router.navigate(['/register']);
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
      this.selected = [
        title.options[title.selectedIndex].text,
        trainer.options[trainer.selectedIndex].text,
        trainer.options[trainer.selectedIndex].value
      ];
    });
  }

}
