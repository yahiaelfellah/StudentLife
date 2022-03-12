import { environment } from "./../../environments/environment";
import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
// import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthFirebaseService {

  public user = new BehaviorSubject<firebase.default.User>(null);
  constructor(
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private router: Router,
  ) { }

  get userData() {
    return this.user.value;
  }

  async login(username, password) {
    return this.afAuth.signInWithEmailAndPassword(username, password).then((user) => {
      localStorage.setItem("userId", user.user.uid);
      localStorage.setItem("user", JSON.stringify(user.user));
      this.user.next(user.user);

    });
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // googleLogin() {
  //   if (this.platform.is("capacitor") || this.platform.is("cordova")) {
  //     this.nativeGoogleLogin();
  //   } else {
  //     this.webGoogleLogin();
  //   }
  // }
  // async nativeGoogleLogin() {
  //   try {
  //     const gplusUser = await this.gplus.login({
  //       webClientId: environment.googlePLus.key,
  //       offline: true,
  //       scopes: "profile email",
  //     });
  //     const credential = firebase.default.auth.GoogleAuthProvider.credential(
  //       gplusUser.idToken
  //     );
  //     return this.afAuth.signInWithCredential(credential);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async webGoogleLogin() {
  //   try {
  //     const provider = new firebase.default.auth.GoogleAuthProvider();
  //     const credential = await this.afAuth.signInWithPopup(provider);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async logout() {
    await this.afAuth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
