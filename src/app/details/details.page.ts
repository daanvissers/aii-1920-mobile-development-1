import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  pokemon: any;
  options = {

  };

  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService,
              private soundService: SoundService) { }

  ngOnInit() {
    // Get the home/:index parameter from the route url
    let index = this.route.snapshot.paramMap.get('index');

    this.pokemonService.get(index).subscribe(pokemon => {
      console.log(pokemon);
      this.pokemon = pokemon;
    });
  }

  play(index: number) {
    this.soundService.playCry(index);
  }

}
