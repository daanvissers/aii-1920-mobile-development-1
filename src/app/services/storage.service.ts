import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  storeSettings(key: string, value: boolean) {
    this.storage.set(key, value);
    // console.log('Successfully set ' + key + ' as ' + value);
  }

  async getSettings(key: string) {
    const result: boolean = await this.storage.get(key);
    // console.log('Got ' + result + ' from storage');
    return result;
  }
}
