import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { ModalController } from "@ionic/angular";
import { ClassService } from "src/app/services/class.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-mymodal",
  templateUrl: "./mymodal.page.html",
  styleUrls: ["./mymodal.page.scss"],
})
export class MymodalPage implements OnInit {
  @Input() title: string;
  form: FormGroup;
  submitted = false;
  loading: false;
  days: string[];
  taskForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private taskService : TaskService,
    public modalController: ModalController,
  ) {
    this.title = "";
    this.days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      startTime: ["", Validators.required],
      startDate:["",Validators.required],
      endDate:["",Validators.required],
      endTime: ["", Validators.required],
      day: ["", Validators.required],
    });
    this.taskForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      class: ["", Validators.required],
      endTask: ["", Validators.required],
      status:["created"],
      isExam:[false]
    });
  }

  get f() {
    return this.form.controls;
  }
  get _f(){
    return this.taskForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.classService.createClass(this.form.value).then((e) => {
      this.modalController.dismiss();
    });

  }
  onTaskSubmit() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.taskForm.value
    this.taskService.createTask(this.taskForm.value).then(() => {
      this.modalController.dismiss();
      this.taskService.newTask.next(true);
    });
  }
  cancel() {
    this.modalController.dismiss();
  }
}
