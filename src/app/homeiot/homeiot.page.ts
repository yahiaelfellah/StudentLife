import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Accelorometer, Flame, Gas, Temperature } from '../models/iot.model';
import { User, _User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { IotService } from '../services/iot.service';
import { UserService } from '../services/user.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-homeiot',
  templateUrl: './homeiot.page.html',
  styleUrls: ['./homeiot.page.scss'],
})
export class HomeiotPage implements OnInit {
  public _user: _User;
  public cardN: number = 0;
  public temperatures: BehaviorSubject<Temperature[]> = new BehaviorSubject(null);
  public gas: BehaviorSubject<Gas[]> = new BehaviorSubject(null);
  public flames: BehaviorSubject<Flame[]> = new BehaviorSubject(null);
  public accelorometers: BehaviorSubject<Accelorometer[]> = new BehaviorSubject(null);

  private currentTemperature: Temperature = null;
  private LPGCurve = [2.3, 0.21, -0.47]
  constructor(public authService: AuthenticationService, public userService: UserService, public iotservice: IotService, public plt: Platform, private vibration: Vibration) {
    this.iotservice.getTemperature().subscribe(value => this.temperatures.next(value));
    this.iotservice.getGas().subscribe(value => this.gas.next(value));
    this.iotservice.getFlame().subscribe(value => this.flames.next(value));
    this.iotservice.getAccelorometer().subscribe(value => this.accelorometers.next(value));
  }


  get _temperatures() {
    return this.temperatures.getValue() ? this.temperatures.getValue() : [];
  }
  get _gases() {
    return this.gas.getValue() ? this.gas.getValue() : [];
  }
  get _flames() {
    return this.flames.getValue() ? this.flames.getValue() : [];
  }
  get _accelorometers() {
    return this.accelorometers.getValue() ? this.accelorometers.getValue() : [];
  }
  get date() {
    return new Date().toDateString();
  }

  public convertToPPM(value: any) {
    return (Math.pow(10, (((Math.log10(value) - this.LPGCurve[1]) / this.LPGCurve[2]) + this.LPGCurve[0]))).toFixed(3)
  }
  public CheckFlame(value: any) {
    if (value == 1) {
      this.vibrateWithPattern();
    }
    return value == 1 ? "Good" : "Alert"
  }

  vibrateWithPattern() {
    // Patterns work on Android and Windows only
    this.vibration.vibrate(500);
  }
  public calculateAcceleration(value: any) {
    return value ? Math.sqrt(Math.pow(value.Ax, 2) + Math.pow(value.Ay, 2) + Math.pow(value.Az, 2)).toFixed(1) : NaN;
  }
  updateClosed() {
    this.cardN = 0;
  }
  updateOpened(value) {
    this.cardN = value
  }

  getLast10elements(array: any[]) {
    return array.slice(Math.max(array.length - 5, 0)).reverse();
  }
  ngOnInit() {
    setTimeout(() => {
      this._user = this.userService._user;
    }, 100)
    if (!this._user) {
      var user = localStorage.getItem("user") as any;
      this.userService.createUser(user);
    }
  }

}
