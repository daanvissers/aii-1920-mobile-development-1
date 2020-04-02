import {Component, OnInit, ViewChild} from '@angular/core';
import { StorageService } from '../../services/storage.service';
import {IonContent, IonToggle} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  place: boolean;
  hitboxes: boolean;
  interaction: boolean;

  @ViewChild(IonToggle, {static: false}) ionToggle: IonToggle;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.storage.getSettings('place').then(res => {
      this.place = res;
    });
    this.storage.getSettings('hitboxes').then(res => {
      this.hitboxes = res;
    });
    this.storage.getSettings('interaction').then(res => {
      this.interaction = res;
    });
  }

  updateSettings(key: string, value: boolean) {
    this.storage.storeSettings(key, value);
  }

}
