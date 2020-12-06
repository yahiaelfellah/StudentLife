import { Class } from "./../models/class.model";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ClassService {
  collectionName: string = "classes";
  public newClass : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public _newClass = this.newClass.asObservable();

  constructor(private firestore: AngularFirestore) {}
  createClass(task: Class) {
    task.userId = JSON.parse(localStorage.getItem("user")).uid;
    return this.firestore.collection(this.collectionName).add(task);
  }

  // getClasses(): Observable<Class[]> {
  //   return this.firestore.collection<Class>(this.collectionName).valueChanges();
  // }
  getClasses() {
    return this.firestore.collection<Class>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Class;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
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
