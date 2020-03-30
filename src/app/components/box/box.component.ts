import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from '../../services/authentication.service';
import { PokemonService } from '../../services/pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {

  pokemon: any;
  box: any[] = [];

  constructor(private db: AngularFireDatabase,
              private auth: AuthenticationService,
              private pokemonService: PokemonService) { }

  ngOnInit() {
    // On init, subscribe to the list of caught Pokémons
    // and get the list for displaying in the popover
    this.db.list(`/box/${this.auth.auth.uid}`).valueChanges()
        .subscribe(res => {
          this.pokemon = res;
          this.box = this.pokemonService.getMultiple(res);
        });
  }
}
