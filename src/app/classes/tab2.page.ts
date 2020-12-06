import { ClassService } from "./../services/class.service";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Class } from "../models/class.model";
import { BehaviorSubject } from "rxjs";
import * as moment from "moment";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  public data: BehaviorSubject<Class[]>;
  public searchTerm : string ="";
  private userId: string = "";
  constructor(private classService: ClassService,public alertController: AlertController) {
    this.data = new BehaviorSubject<Class[]>([]);
    this.classService.newClass.next(false);

  }
  get classValue() {
    return this.filterItems(this.searchTerm);
  }
  getTime(value) {
    return moment(value).format("HH:mm");
  }
  getDate(value) {
    return moment(value).format("YYYY/MM/DD");
  }
  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.classService.getClasses().subscribe((value) => {
      this.data.next(value.filter((o) => o.userId === user.uid));
    });

  }

  getInitials(value: string) {
    value.split(" ");
  }

  checkStatus(value){
    const remaining = moment(value).diff(moment(), "days");
    if(remaining < 0) {
      return {
        status:'processong',
        text:'Running'
      }
    }
    return {
      status:'success',
      text:'Ended'
    }
  }


  async deleteCourse(_class:Class) {
    const alert = await this.alertController.create({
      header: 'Delete !',
      message: `Are you sure u want to delete ${_class.title}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.classService.deleteClass(_class.id);
          }
        }
      ]
    });
    await alert.present();
  }
  filterItems(searchTerm){
    return this.data.value.filter((item) => {
         return item.title.toLowerCase().includes(searchTerm.toLowerCase());
     });  

 }
  
}
