import { Injectable } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { SoundService } from './sound.service';

@Injectable({
  providedIn: 'root'
})
export class VibrationService {

  // Vibrate the device
  // Duration is ignored on iOS.
  constructor(private vibration: Vibration,
              private soundService: SoundService) { }

  short() {
    // Vibrate the device for 200ms
    this.vibration.vibrate(200);
    console.log("[LOG] Executing short vibration...");
  }

  long() {
    // Vibrate the device for one second
    this.vibration.vibrate(1000);
    console.log("[LOG] Executing long vibration...");
  }

  onCry() {
    // Vibrate the device based on cry length
    let duration = Math.floor(this.soundService.getCurrentCryLength() * 1000);
    this.vibration.vibrate(duration);
    console.log(`[LOG] Executing vibration based on cry length: ${duration}...`);
  }
  
}
