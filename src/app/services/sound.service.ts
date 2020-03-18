import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  soundPath: string = "./assets/sounds/";
  player: Howl = null;

  constructor() { }

  // Plays the cry from the given Pokémon number
  playCry(index: number) {
    this.player = new Howl({
      src: [this.soundPath + "cries/" + index + ".wav"]
    });
    this.player.play();
    console.log(`[LOG] Playing cry from Pokémon with number ${index}...`);
  }
}
