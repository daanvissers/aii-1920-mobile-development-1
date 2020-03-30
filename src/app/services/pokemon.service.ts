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

    get(id) {
        return this.http.get(`${this.baseUrl}/pokemon/${id}`).pipe(
            map(pokemon => {

                // Array with sprite names, to remap and re-order them
                const sprites = [
                    'front_default', 'front_female', 'front_shiny', 'front_female_shiny',
                    'back_default', 'back_female', 'back_shiny', 'back_female_shiny'
                ];

                // Remap them to a newly made 'images' property
                pokemon['images'] = sprites
                    .map(key => pokemon['sprites'][key])
                    // Filters for URLs that are null
                    .filter(img => img);

                // Get descriptions
                pokemon['descriptions'] = this.getDescriptions(id);

                return pokemon;
            })
        );
    }

    getAll(offset = 0) {
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

    find(index) {
        return this.http.get(`${this.baseUrl}/pokemon/${index.toLowerCase()}`).pipe(
            map(pokemon => {
                pokemon['image'] = this.getImage(pokemon['id']);
                pokemon['number'] = pokemon['id'];
                return pokemon;
            })
        );
    }

    getImage(index) {
        return `${this.imageUrl}${index}.png`;
    }

    getDescriptions(index) {
        return this.http.get(`${this.baseUrl}/pokemon-species/${index}`).pipe(
            map(result => {
                const res = result['flavor_text_entries']
                    // Filter Japanese and Korean descriptions out, so European remain
                    .filter(desc => desc.language.name == "en" || desc.language.name == "de"
                        || desc.language.name == "it" || desc.language.name == "fr"
                        || desc.language.name == "es");
                return res;
            })
        );
    }

    // Takes an array of numbers[] and returns a set of Pokémon
    // Currently not an observable
    getMultiple(res: unknown[]) {
      const collection: any[] = [];
      res.forEach(val => {
          // console.log('Getting ' + val);
          this.get(val).subscribe(value => {
              // console.log('Got' + value['name']);
              collection.push(value);
          });
      });
      return collection;
    }
}
