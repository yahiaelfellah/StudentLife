import { TaskService } from "./../services/task.service";
import { Component } from "@angular/core";
import { Task } from "../models/task.model";
import { BehaviorSubject } from "rxjs";
import * as moment from "moment";
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  public exams: Task[];
  public tasks: Task[];
  public data: BehaviorSubject<Task[]>;
  private userId: string = "";
  constructor(private taskService: TaskService) {
    this.data = new BehaviorSubject<Task[]>(null);
  }

  get tasksValue() {
    return this.data.value;
  }

  checkStatus(value) {
    return moment(value).diff(moment(),'seconds') < 0 ? { color : 'danger', label : "Overdue" } : {color:'success',label:'Running'};
  }
  formattedDate(value){
    return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
  }
  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.taskService.getTasks().subscribe((value) => {
      this.data.next(value.filter((o) => o.userId === user.uid ));
    });
  }
}
