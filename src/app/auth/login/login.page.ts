import { AuthFirebaseService } from "./../../services/authFirebase.service";
import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { LoadingController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  passwordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    public afService: AuthFirebaseService,
    private userService: UserService

  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const loading = await this.loadingController.create({
      cssClass: "custom-laoding",
      message: "Please wait...",
    });
    await loading.present();
    this.authenticationService.SignIn(this.f.username.value, this.f.password.value).then(
      (success) => {
        loading.dismiss();
        this.loading = false;
        this.userService.getUserById(success.user.uid).subscribe(value => {
          this.userService.user.next(value);
          this.router.navigate(['home']);

        })

      }
    ).catch(err => {
      loading.dismiss();
      this.loading = false;
    })

  }
  async onGoolgeLogin() {
    this.loading = true;
    const loading = await this.loadingController.create({
      cssClass: "custom-laoding",
      message: "Please wait...",
    });
    this.authenticationService.GoogleAuth().then((success) => {
      loading.dismiss();
      this.loading = false;
      this.router.navigate(['home']);
    })
  }
}

