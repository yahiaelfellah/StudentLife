import { ClassService } from 'src/app/services/class.service';
import { TaskService } from 'src/app/services/task.service';
import { Component } from "@angular/core";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { ModalPage } from "../components/modal/modal.page";
import { MymodalPage } from "../components/mymodal/mymodal.page";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  public newTask: boolean = false;
  public newClass: boolean = false;
  constructor(
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public taskService : TaskService,
    public classService: ClassService
  ) {
    this.taskService._newTask.subscribe((val) => {
      this.newTask = val;
    })
    this.classService._newClass.subscribe((val) => {
      this.newClass = val;
    })
  }

  async presentModal(prop) {
    const modal = await this.modalController.create({
      component: MymodalPage,
      cssClass: "my-custom-modal-class",
      componentProps: {
        ...prop,
      },
    });
    return await modal.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Create Task",
          icon: "bookmark-outline",
          handler: () => {
            this.presentModal({ title: 'Task' });
          },
        },

        {
          text: "Create Class",
          icon: "heart",
          handler: () => {
            this.presentModal({ title: 'Class' });
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
