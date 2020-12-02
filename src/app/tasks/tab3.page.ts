import { TaskService } from "./../services/task.service";
import { Component } from "@angular/core";
import { Task } from "../models/task.model";
import { BehaviorSubject } from "rxjs";
import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  public exams: Task[];
  public tasks: Task[];
  public data: BehaviorSubject<Task[]>;
  private searchItem: string = "";
  private userId: string = "";
  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    this.data = new BehaviorSubject<Task[]>(null);
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.searchItem = params["searchItem"] || "";
    });
  }

  get tasksValue() {
    return this.filterItems(this.searchItem);
  }

  checkStatus(value) {
    return moment(value).diff(moment(), "seconds") < 0
      ? { color: "danger", label: "Overdue" }
      : { color: "success", label: "Running" };
  }
  formattedDate(value) {
    return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
  }
  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.taskService.getTasks().subscribe((value) => {
      console.log(value);
      this.data.next(value.filter((o) => o.userId === user.uid));
    });
  }
  ionViewDidLeave(){
    this.close();
  }
  changeFilter(value) {
    this.searchItem = value;
  }
  filterItems(searchTerm) {
    if (this.data.value) {
      return this.data.value.filter((item) => {
        return item.status.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    return this.data.value;
  }

  close(){
    this.searchItem = "";
  }
  sliddingEdit(id:string,task:Task,value:string) {
    task.status = value;
    this.taskService.editTask(id,task);
  }
}
