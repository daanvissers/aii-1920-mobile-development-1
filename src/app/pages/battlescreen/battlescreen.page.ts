import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-battlescreen',
  templateUrl: './battlescreen.page.html',
  styleUrls: ['./battlescreen.page.scss'],
})
export class BattlescreenPage implements OnInit {

  pokemon: any;

  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService,
              private db: AngularFireDatabase,
              private auth: AuthenticationService,
              private toast: ToastService,
              private router: Router) { }

  ngOnInit() {
    // Get the dex/:index parameter from the route url
    const index = this.route.snapshot.paramMap.get('index');

    this.pokemonService.get(index).subscribe(pokemon => {
      console.log('Encountered ');
      console.log(pokemon);
      this.pokemon = pokemon;
    });
  }

  catch() {
    // TODO: Guard this, when user is not authenticated!
    if (this.auth.isAuthenticated()) {
      // Catch the Pokémon
      this.db.list(`/box/${this.auth.auth.uid}`).push(this.pokemon.id);
      this.toast.presentToast(`Congratulations! You caught ${this.pokemon.name}!`, 7000);
      console.log(this.auth.auth.uid + ' successfully caught ' + this.pokemon.name + `!`);
    } else {
      console.log(`You're not authenticated...`);
    }
    this.router.navigate(['/tabs/map']);
  }
}
