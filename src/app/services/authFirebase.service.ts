import { environment } from "./../../environments/environment";
import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { GooglePlus } from "@ionic-native/google-plus/ngx";

@Injectable({ providedIn: "root" })
export class AuthFirebaseService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

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
      this.currentUserSubject.next(credential.user);
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    await this.afAuth.signOut().then(() => {
      localStorage.removeItem("currentUser");
      this.currentUserSubject.next(null);
    });
  }
}
