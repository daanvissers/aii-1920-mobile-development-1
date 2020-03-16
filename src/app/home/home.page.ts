import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokemon = [];
  offset = 0;

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?) {

    // Load another 25 items
    if (loadMore)
      this.offset += 25;

    this.pokemonService.getPokemon(this.offset)
      .subscribe(res => {
        console.log('result: ', res);
        // Append new Pokemon to existing array
        this.pokemon = [...this.pokemon, ...res];

        if (event)
          event.target.complete();

        if (this.offset == 125) {
          this.infiniteScroll.disabled = true;
        }
      });
  }

}
