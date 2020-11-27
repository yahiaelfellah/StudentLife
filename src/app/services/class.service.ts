import { Class } from './../models/class.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  collectionName: string;

  constructor(private firestore: AngularFirestore) { }
  createClass(task: Class) {
    task.id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).add(task);
  }

  getClasses(id?: string) {
    return id
      ? this.firestore.collection<Class>(this.collectionName).valueChanges()
      : this.firestore
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
