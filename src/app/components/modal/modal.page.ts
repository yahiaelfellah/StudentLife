import { ClassService } from "./../../services/class.service";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"],
})
export class ModalPage implements OnInit {
  @Input() title: string;
  form: FormGroup;
  taskForm: FormGroup;
  submitted = false;
  loading: false;
  days: string[];
  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    public modalController: ModalController
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
      endTime: ["", Validators.required],
      day: ["", Validators.required],
    });

  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.classService.createClass(this.form.value).then((e) => {
      this.modalController.dismiss();
    });
  }
  cancel() {
    this.modalController.dismiss();
  }
}
