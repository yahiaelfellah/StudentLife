import { NavController } from "@ionic/angular";
import { ClassService } from "src/app/services/class.service";
import { AuthenticationService } from "./../services/authentication.service";
import { UserService } from "src/app/services/user.service";
import { TaskService } from "./../services/task.service";
import { AuthFirebaseService } from "../services/authFirebase.service";
import { Component, OnInit } from "@angular/core";
import { timer, BehaviorSubject, Observable } from "rxjs";
import { delayWhen, scan, takeWhile } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { _User } from "../models/user.model";
import { NavigationExtras, Router } from "@angular/router";
import { Class } from "../models/class.model";
import * as moment from "moment";
import { Task } from "../models/task.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public _user: _User;
  private classes: BehaviorSubject<Class[]>;
  private _tasks: BehaviorSubject<Task[]>;
  public tasks: any[];
  totlaDuration: number = 120;
  percentage: BehaviorSubject<number>;
  remainingTime$ = timer(0, 60000).pipe(
    scan((acc) => --acc, 60),
    takeWhile((x) => x >= 0)
  );

  constructor(
    public authService: AuthenticationService,
    public userService: UserService,
    public ngFireAuth: AngularFireAuth,
    public classService: ClassService,
    public taskService: TaskService,
    public navCtrl: NavController
  ) {
    this.classes = new BehaviorSubject<Class[]>([]);
    this._tasks = new BehaviorSubject<Task[]>([]);
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

  get _classes() {
    return this.classes.value.sort((a, b) =>
      this.calculateRemainingTime(a.endTime) <
      this.calculateRemainingTime(b.endTime)
        ? 1
        : -1
    );
  }

  get taskInfo() {
    if (this._tasks.value) {
      return {
        doneTasks: this._tasks.value.filter((o) => o.status === "done").length,
        startedTasks: this._tasks.value.filter((o) => o.status === "started")
          .length,
        creadtedTasks: this._tasks.value.filter((o) => o.status === "created")
          .length,
      };
    }
    return {
      doneTasks: 0,
      startedTasks: 0,
      creadtedTasks: 0,
    };
  }
  get date() {
    return new Date().toDateString();
  }
  ngOnInit(): void {
    this._user = this.userService._user;
    if (!this._user) {
      this.ionViewWillEnter();
    }
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
  get getRemainingTime(): Observable<number> {
    return timer(0, 60000).pipe(
      scan(
        (acc) => --acc,
        this.calculateRemainingTime(this._classes[0].endTime)
      ),
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
    this.navCtrl.navigateForward(["/task"],navigationExtras);
  }
}
