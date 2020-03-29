import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-battlescreen',
  templateUrl: './battlescreen.page.html',
  styleUrls: ['./battlescreen.page.scss'],
})
export class BattlescreenPage implements OnInit {

  pokemon: any;

  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService) { }

  ngOnInit() {
    // Get the home/:index parameter from the route url
    let index = this.route.snapshot.paramMap.get('index');

    this.pokemonService.get(index).subscribe(pokemon => {
      console.log("Encountered ");
      console.log(pokemon);
      this.pokemon = pokemon;
    });
  }

}
