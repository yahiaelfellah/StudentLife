import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { _User } from "../models/user.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";

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

  // Create new class

}
