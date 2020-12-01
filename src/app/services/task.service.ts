import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private collectionName: string = "tasks";
  constructor(private firestore: AngularFirestore) {}

  createTask(task: Task) {
    task.userId = localStorage.getItem("userId");
    return this.firestore.collection(this.collectionName).add(task);
  }

  getTaskById(id: string){
    return this.firestore
    .collection<Task>(this.collectionName)
    .doc<Task>(id)
    .valueChanges();
  }
  getTasks(id?: string) {
    return this.firestore.collection<Task>(this.collectionName).valueChanges();
  }

  deleteTask(id: string) {
    return this.firestore
      .collection<Task>(this.collectionName)
      .doc<Task>(id)
      .delete();
  }
  editTask(id: string, taskUpdate: Task): Promise<void> {
    return this.firestore
      .collection<Task>(this.collectionName)
      .doc<Task>(id)
      .update(taskUpdate);
  }
}
