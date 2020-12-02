import { Class } from "./../models/class.model";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClassService {
  collectionName: string = "classes";

  constructor(private firestore: AngularFirestore) {}
  createClass(task: Class) {
    task.userId = JSON.parse(localStorage.getItem("user")).uid;
    return this.firestore.collection(this.collectionName).add(task);
  }

  getClasses(): Observable<Class[]> {
    return this.firestore.collection<Class>(this.collectionName).valueChanges();
  }
  getClassebyId(id: string) {
    return this.firestore
      .collection<Class>(this.collectionName)
      .doc<Class>(id)
      .valueChanges();
  }

  deleteClass(id: string) {
    return this.firestore
      .collection<Class>(this.collectionName)
      .doc<Class>(id)
      .delete();
  }
  editClass(id: string, taskUpdate: Class): Promise<void> {
    return this.firestore
      .collection<Class>(this.collectionName)
      .doc<Class>(id)
      .update(taskUpdate);
  }
}
