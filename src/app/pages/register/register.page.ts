import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  register(user: User) {
    this.auth.register(user);
  }

}
