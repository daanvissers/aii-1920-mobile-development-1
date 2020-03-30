import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'dex.page.html',
  styleUrls: ['dex.page.scss'],
})
export class DexPage implements OnInit {

  pokemon = [];
  offset = 0;

  @ViewChild(IonContent, {static: false}) ionContent: IonContent;
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?) {
    // Load another 25 items
    if (loadMore)
      this.offset += 25;

    this.pokemonService.getAll(this.offset)
      .subscribe(res => {
        // Append new Pokemon to existing array
        this.pokemon = [...this.pokemon, ...res];

        if (event)
          event.target.complete();

        if (this.offset >= 375) {
          this.infiniteScroll.disabled = true;
        }
      });
  }

  onSearchChange(event) {
    let value = event.detail.value;

    // If Search bar is empty, return regular list
    if(value == '' || value > 386) {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokemonService.find(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      // When it errors, empty the array to show no results
      this.pokemon = []
    })
  }

  scrollToTop() {
    this.ionContent.scrollToTop(300);
  }

  scrollToBottom() {
    this.ionContent.scrollToBottom(300);
  }
}
