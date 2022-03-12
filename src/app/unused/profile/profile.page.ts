import { NgZone } from '@angular/core';
import { _User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public _user: _User;
  constructor(private userService: UserService, private ngZone: NgZone) { }

  ngOnInit() {
    setTimeout(() => {
      this.ngZone.runOutsideAngular(() => {
        this._user = this.userService._user;
      });
    }, 500)

  }

  ionViewWillEnter() {
    setTimeout(() => {
      this._user = this.userService._user;
    }, 500);
  }
}
