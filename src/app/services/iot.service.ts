import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Accelorometer, Flame, Gas, Temperature } from '../models/iot.model';

@Injectable({
  providedIn: 'root'
})
export class IotService {
  temperatures: AngularFireList<Temperature>
  flame: AngularFireList<Flame>
  accelorometer: AngularFireList<Accelorometer>
  gas: AngularFireList<Gas>
  constructor(private db: AngularFireDatabase) {

  }

  getTemperature(): Observable<Temperature[]> {
    this.temperatures = this.db.list("temperature");
    return this.temperatures.valueChanges();
  }
  getFlame(): Observable<Flame[]> {
    this.flame = this.db.list("flame");
    return this.flame.valueChanges();
  }
  getAccelorometer(): Observable<Accelorometer[]> {
    this.accelorometer = this.db.list("accelorometer");
    return this.accelorometer.valueChanges();
  }
  getGas(): Observable<Temperature[]> {
    this.gas = this.db.list("gas");
    return this.gas.valueChanges();
  }
}
