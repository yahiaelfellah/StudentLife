import { Component, TemplateRef } from '@angular/core';
import { timer, Observable, BehaviorSubject } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  totlaDuration : number = 120;
  percentage : BehaviorSubject<number>;
  remainingTime$ = timer(0,60000).pipe(
    scan(acc => --acc,60),
    takeWhile(x => x >= 0)
    );
  
  get date(){
    return new Date().toDateString();
  }
  async precentage(){
    const time = await this.remainingTime$.toPromise()
    return time/this.totlaDuration ;
  }
  getTimeRemaining(endtime){
    console.log(Date.parse(endtime));
    const timestamp = new Date().getTime();
    const total = Date.parse(endtime) - timestamp;
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  constructor() {
  }

}
