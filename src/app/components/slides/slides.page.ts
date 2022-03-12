import { _User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { Component, ViewChild } from "@angular/core";
import { IonSlides, NavController, NavParams } from "@ionic/angular";
import { HomePage } from "src/app/unused/home/home.page";
import { Router } from '@angular/router';
@Component({
  selector: "app-slides",
  templateUrl: "./slides.page.html",
  styleUrls: ["./slides.page.scss"],
})
export class SlidesPage {
  public displyName: string = '';
  public _index: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  @ViewChild('mySlider') slides: IonSlides;

  constructor(private router: Router, private userService: UserService) {

  }
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  finish() {
    this.router.navigate(["home"]);
  }
  swipeNext() {
    const user = JSON.parse(localStorage.getItem("user"));
    const _user = {
      displayName: this.displyName,
    }
    this.userService.editUser(user.uid, _user);
    this.slides.slideNext();
  }

}
