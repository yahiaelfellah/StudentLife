import { NavController } from "@ionic/angular";

import { AfterViewInit, Component, NgZone, OnInit } from "@angular/core";
import { timer, BehaviorSubject, Observable } from "rxjs";
import { delayWhen, scan, takeWhile } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { _User } from "../models/user.model";
import { NavigationExtras, Router } from "@angular/router";
import { Class } from "../models/class.model";
import * as moment from "moment";
import { Task } from "../models/task.model";
import { AuthenticationService } from "../services/authentication.service";
import { ClassService } from "../services/class.service";
import { TaskService } from "../services/task.service";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public _user: _User;
  private classes: BehaviorSubject<Class[]>;
  private _tasks: BehaviorSubject<Task[]>;
  private $tasks: Task[] = [];
  private _clas: Class[] = [];
  public tasks: any[];
  totlaDuration: number = 120;
  percentage: BehaviorSubject<number>;
  remainingTime$: Observable<number>;

  constructor(
    public authService: AuthenticationService,
    public userService: UserService,
    public ngFireAuth: AngularFireAuth,
    public classService: ClassService,
    public taskService: TaskService,
    //public WeatherService: WeatherService,
    public navCtrl: NavController,
    public ngZone: NgZone // private localNotifications: LocalNotifications
  ) {
    this.classes = new BehaviorSubject<Class[]>(this._clas);
    this._tasks = new BehaviorSubject<Task[]>(this.tasks);

    this.tasks = [
      {
        title: "To Do",
        count_now: 0,
        count_started: 0,
        icon: "time-outline",
        color: "danger",
      },
      {
        title: "In Progress",
        count_now: 0,
        count_started: 0,
        icon: "refresh-outline",
        color: "primary",
      },
      {
        title: "Done",
        count_now: 0,
        count_started: 0,
        icon: "play-forward-outline",
        color: "blue",
      },
    ];
  }

  // single_notification() {
  //   // Schedule a single notification
  //   this.localNotifications.schedule({
  //     id: 1,
  //     text: 'Single ILocalNotification',
  //     sound: 'file://sound.mp3',
  //     data: { secret: 'key_data' }
  //   });
  // }

  get _classes() {
    return this.classes.value
      .sort((a, b) =>
        this.calculateRemainingTime(a.endTime) <
          this.calculateRemainingTime(b.endTime)
          ? 1
          : -1
      )
      .filter((o) => o.day === moment().format("dddd"));
  }
  get _classOnGoing() {
    return this._classes.length
      ? this._classes.filter((o) => o.day === moment().format("dddd"))[0]
      : null;
  }
  get doneTasks() {
    return this._tasks.value
      ? this._tasks.value.filter((o) => o.status === "done").length
      : 0;
  }
  get startedTasks() {
    return this._tasks.value
      ? this._tasks.value.filter((o) => o.status === "started").length
      : 0;
  }
  get createdTasks() {
    return this._tasks.value
      ? this._tasks.value.filter((o) => o.status === "created").length
      : 0;
  }

  get date() {
    return new Date().toDateString();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this._user = this.userService._user;
      // if (this.platform.is('android') || this.platform.is('mobileweb')) { }
      // else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          //this.WeatherService.getCurrentWeather(position.coords.latitude, position.coords.longitude).subscribe(value => console.log(value));
        })

      }
      // }
      // this.classService.getClasses().subscribe((value) => {
      //   this.classes.next(
      //     value.filter(
      //       (o) =>
      //         o.day === moment().format("dddd") && o.userId === this._user.uid
      //     )

      //   );
      //   setTimeout(() => {
      //     this.remainingTime$ = this.getRemainingTime();
      //   },3000);
      // });
      // // this.remainingTime$ = this.getRemainingTime();
      // this.taskService.getTasks().subscribe((value) => {
      //   this._tasks.next(value.filter((o) => o.userId === this._user.uid));
      // });
    }, 500);

  }

  ionViewWillEnter() {
    setTimeout(() => {
      this._user = this.userService._user;
      this.classService.getClasses().subscribe((value) => {
        this.classes.next(
          value.filter(
            (o) =>
              o.day === moment().format("dddd") && o.userId === this._user.uid
          )
        );
        setTimeout(() => {
          this.remainingTime$ = this.getRemainingTime();
        }, 3000);
      });
      this.taskService.getTasks().subscribe((value) => {
        this._tasks.next(value.filter((o) => o.userId === this._user.uid));
      });
    }, 500);
  }
  getTime(value) {
    return moment(value).format("HH:mm");
  }

  private calculateRemainingTime(end) {
    return moment(end).diff(moment(), "minutes");
  }
  getRemainingTime(): Observable<number> {
    const time = this._classes.length ? this._classes[0].endTime : 0;
    return timer(0, 60000).pipe(
      scan((acc) => --acc, this.calculateRemainingTime(time)),
      takeWhile((x) => x >= 0)
    );

  }
  getUserData() {
    this._user = this.userService._user;
  }


}
