import { environment } from "./../../environments/environment";
import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthFirebaseService {
  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private router: Router,
  ) {}



  async login(username, password) {
    return this.afAuth.signInWithEmailAndPassword(username, password);
  }

  googleLogin() {
    if (this.platform.is("capacitor") || this.platform.is("cordova")) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }
  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: environment.googlePLus.key,
        offline: true,
        scopes: "profile email",
      });
      const credential = firebase.default.auth.GoogleAuthProvider.credential(
        gplusUser.idToken
      );
      return this.afAuth.signInWithCredential(credential);
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin() {
    try {
      const provider = new firebase.default.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    await this.afAuth.signOut().then(() => {
        this.router.navigate(['/login']);
    });
  }
}
