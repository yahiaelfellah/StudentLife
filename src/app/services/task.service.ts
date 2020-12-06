import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private collectionName: string = "tasks";
  public newTask : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public _newTask = this.newTask.asObservable();
  constructor(private firestore: AngularFirestore) {}

  createTask(task: Task) {
    task.userId = JSON.parse(localStorage.getItem("user")).uid;
    return this.firestore.collection(this.collectionName).add(task);
  }

  getTaskById(id: string){
    return this.firestore
    .collection<Task>(this.collectionName)
    .doc<Task>(id)
    .valueChanges();
  }
  getTasks() {
    return this.firestore.collection<Task>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  deleteTask(id: string) {
    return this.firestore
      .collection<Task>(this.collectionName)
      .doc<Task>(id)
      .delete();
  }
  editTask(id: string, taskUpdate: Task): Promise<void> {
    delete taskUpdate.id;
    return this.firestore
      .collection<Task>(this.collectionName)
      .doc<Task>(id)
      .update(taskUpdate);
  }
}
