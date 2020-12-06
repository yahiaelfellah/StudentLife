import { AlertController } from "@ionic/angular";
import { TaskService } from "./../services/task.service";
import { Component } from "@angular/core";
import { Task } from "../models/task.model";
import { BehaviorSubject, Observable, timer } from "rxjs";
import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { scan, takeWhile } from "rxjs/operators";
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  public exams: Task[] = [];
  public tasks: Task[] = [];
  public data: BehaviorSubject<Task[]>;
  private searchItem: string = "";
  private userId: string = "";
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.data = new BehaviorSubject<Task[]>(null);
    this.route.queryParams.subscribe((params) => {
      this.searchItem = params["searchItem"] || "";
    });
    this.taskService.newTask.next(false);
  }

  get tasksValue() {
    return this.filterItems(this.searchItem).filter(o => !o.isExam);
  }
  get examValue(){
    return this.filterItems(this.searchItem).filter(o => o.isExam);
  }
  getRemainingTime(task: Task) {
    const inHours = moment(task.endTask).endOf("day").diff(moment(), "hours");
    const inMinuts = moment(task.endTask)
      .endOf("day")
      .diff(moment(), "minutes");
    const inSeconds = moment(task.endTask)
      .endOf("day")
      .diff(moment(), "seconds");
    if (inHours <= 0) {
      return `${inMinuts} minutes`;
    }
    if (inMinuts <= 1) {
      return `${inSeconds} sec`;
    }
    return `${inHours} hours`;
  }

  checkStatus(value: Task) {
    return moment(value.endTask).endOf("day").diff(moment(), "seconds") < 0 &&
      (value.status === "created" || value.status === "started")
      ? { color: "danger", label: "Overdue" }
      : { color: "success", label: "Running" };
  }
  formattedDate(value) {
    return moment(value).endOf("day").format("dddd, MMMM Do YYYY, h:mm:ss a");
  }
  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.taskService.getTasks().subscribe((value) => {
      console.log(value);
      this.data.next(value.filter((o) => o.userId === user.uid));
    });
  }
  ionViewDidLeave() {
    this.close();
  }
  changeFilter(value) {
    this.searchItem = value;
  }
  filterItems(searchTerm) {
    if (this.data.value) {
      return this.data.value.filter((item) => {
            return (
              item.status.toLowerCase().includes(searchTerm.toLowerCase())
            );
          });
    }
    return this.tasks;
  }

  close() {
    this.searchItem = "";
  }
  async deleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: "Delete !",
      message: `Are you sure u want to delete <b>${task.title}</b>`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Okay",
          handler: () => {
            this.taskService.deleteTask(task.id);
          },
        },
      ],
    });
    await alert.present();
  }
  sliddingEdit(id: string, task: Task, value: string) {
    task.status = value;
    this.taskService.editTask(id, task);
  }
}
