import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { AngularFireDatabase,AngularFireList, AngularFireObject} from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userId: string;
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  // Get all rehistered data for the user 
  getDataForUser() {
    if(this.userId){
      return this.db.list(`classes/${this.userId}`);
    }else {
      return [];
    }
  }

  // Create new class

}
