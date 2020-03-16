import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemon(offset = 0) {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      // Map so that it only returns the results needed
      map(result => {
        return result['results'];
      }),
      // Map the result to include images
      map(pokemons => {
        return pokemons.map((pokemon, index) => {
          // Set a new property Image, taking offset into consideration
          pokemon.image = this.getImage(index + offset + 1);
          pokemon.number = index + offset + 1;
          return pokemon;
        })
      })
    );
  }

  getImage(index) {
    return `${this.imageUrl}${index}.png`;
  }
}
