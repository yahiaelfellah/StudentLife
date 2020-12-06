import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)      
    .then((res) => {
      this.router.navigate(["slides"]);
    }).catch((error) => {
      this.presentAlert(error.message);
    })
}
}
