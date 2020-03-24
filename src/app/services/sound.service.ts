import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  soundPath: string = "./assets/sounds/";
  player: Howl = null;
  cry: Howl = null;

  constructor() { }

  setCry(index: number) {
    this.cry = new Howl({
      src: [this.soundPath + "cries/" + index + ".wav"]
    });
  }

  // Plays the cry from the given Pokémon number
  playCry() {
    console.log(`[LOG] Playing cry from Pokémon...`);
    this.cry.play();
  }

  getCurrentCryLength() : number {
    return this.cry.duration();
  }
}
