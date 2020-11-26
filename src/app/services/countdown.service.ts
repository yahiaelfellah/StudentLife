import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, timer } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { scan } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CountdownService {
  constructor() {}
  totlaDuration: number = 120;
  public percentage: BehaviorSubject<number>;

  public getRemainingTime(seed): Observable<number> {
    return timer(0, 60000).pipe(
      scan((acc) => --acc, this.calculateTimeRemaining(seed).minutes),
      takeWhile((x) => x >= 0)
    );
  }
  private calculateTimeRemaining(endtime) {
    const timestamp = new Date().getTime();
    const total = Date.parse(endtime) - timestamp;
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }
}
