import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)      
    .then((res) => {
      this.router.navigate(["home"]);
    }).catch((error) => {
      window.alert(error.message)
    })
}
}
