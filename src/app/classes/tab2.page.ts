import { ClassService } from "./../services/class.service";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Class } from "../models/class.model";
import { BehaviorSubject } from "rxjs";
import * as moment from 'moment'

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  public data: BehaviorSubject<Class[]>;
  constructor(private classService: ClassService) {
    this.data = new BehaviorSubject<Class[]>([]);
  }
  get classValue(){
    return this.data.value;
  }
  getTime(value){
    return moment(value).format("HH:mm");
  }
  ionViewWillEnter() {
    this.classService.getClasses().subscribe((value) => {
      this.data.next(value);
    });
  }

  getInitials(value:string){
    value.split(' ');
  }
}
