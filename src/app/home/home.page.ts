import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokemon = [];
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getPokemon(this.offset)
      .subscribe(res => {
        console.log('result: ', res);
        this.pokemon = res;
      });
  }

}
