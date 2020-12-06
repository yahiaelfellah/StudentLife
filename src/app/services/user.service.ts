import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { _User } from "../models/user.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private collectionName = "users"
  public user:BehaviorSubject<_User> = new BehaviorSubject<_User>(null);
  public userObservable: Observable<_User>;
  constructor(
    private firestore: AngularFirestore,
  ) {
     this.userObservable = this.user.asObservable();
  }
  get _user(){
    return this.user.value;
  }
  createUser(user: _User) {
    return this.firestore.collection(this.collectionName).add(user);
  }

  getUserById(id:string){
    return this.firestore.collection<_User>(this.collectionName).doc<_User>(id).valueChanges();
  }
  editUser(id:any,user: any){
      return this.firestore
        .collection<_User>(this.collectionName)
        .doc<_User>(id)
        .update(user);
  }
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };
  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.default.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  // Create new class

}
