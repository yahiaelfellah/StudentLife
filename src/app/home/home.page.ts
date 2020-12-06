import { NavController } from "@ionic/angular";
import { ClassService } from "src/app/services/class.service";
import { AuthenticationService } from "./../services/authentication.service";
import { UserService } from "src/app/services/user.service";
import { TaskService } from "./../services/task.service";
import { AuthFirebaseService } from "../services/authFirebase.service";
import { Component, NgZone, OnInit } from "@angular/core";
import { timer, BehaviorSubject, Observable } from "rxjs";
import { delayWhen, scan, takeWhile } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { _User } from "../models/user.model";
import { NavigationExtras, Router } from "@angular/router";
import { Class } from "../models/class.model";
import * as moment from "moment";
import { Task } from "../models/task.model";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

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
    return this.classes.value.sort((a, b) =>
      this.calculateRemainingTime(a.endTime) <
      this.calculateRemainingTime(b.endTime)
        ? 1
        : -1
    );
  }
  get _classOnGoing() {
    return this._classes.length
      ? this._classes.filter(
          (o) => this.calculateRemainingTime(o.endTime) > 0
        )[0]
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
      this.ngZone.run(() => {
        this._user = this.userService._user;
        this.classService.getClasses().subscribe((value) => {
          this.classes.next(
            value.filter(
              (o) =>
                o.day === moment().format("dddd") && o.userId === this._user.uid
            )
          );
          this.remainingTime$ = this.getRemainingTime();
        });
        this.taskService.getTasks().subscribe((value) => {
          this._tasks.next(value.filter((o) => o.userId === this._user.uid));
        });
      });
    }, 500);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.ngZone.runOutsideAngular(() => {
        this._user = this.userService._user;
        this.classService.getClasses().subscribe((value) => {
          this.classes.next(
            value.filter(
              (o) =>
                o.day === moment().format("dddd") && o.userId === this._user.uid
            )
          );
          this.remainingTime$ = this.getRemainingTime();
        });
        this.taskService.getTasks().subscribe((value) => {
          this._tasks.next(value.filter((o) => o.userId === this._user.uid));
        });
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
    const time = this._classes ? this._classes[0].endTime : 0;
    return timer(0, 60000).pipe(
      scan((acc) => --acc, this.calculateRemainingTime(time)),
      takeWhile((x) => x >= 0)
    );
  }
  getUserData() {
    this._user = this.userService._user;
  }

  goToTask(i: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        searchItem: "",
      },
    };
    switch (i) {
      case 0:
        navigationExtras.queryParams.searchItem = "created";
        break;
      case 1:
        navigationExtras.queryParams.searchItem = "started";
        break;
      case 2:
        navigationExtras.queryParams.searchItem = "done";
        break;
    }
    this.navCtrl.navigateForward(["/task"], navigationExtras);
  }
}
