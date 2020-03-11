import { Injectable } from "@angular/core";
import ITask from "../Interfaces/Task.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TaskService {
  private ROOT_URL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.ROOT_URL + "tasks");
  }

  deleteTask(taskId: number) {
    this.http.delete(this.ROOT_URL + "tasks/" + taskId).subscribe(
      val => {
        console.log("DELETE call successful value returned in body", val);
      },
      response => {
        console.log("DELETE call in error", response);
      },
      () => {
        console.log("The DELETE observable is now completed.");
      }
    );
  }

  addTask(task: ITask) {
    this.http.post(this.ROOT_URL + "tasks", task).subscribe(
      val => {
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );
  }

  patchTask(task: ITask) {
    this.http.patch(this.ROOT_URL + "tasks/" + task.id, task).subscribe(
      val => {
        console.log("PATCH call successful value returned in body", val);
      },
      response => {
        console.log("PATCH call in error", response);
      },
      () => {
        console.log("The PATCH observable is now completed.");
      }
    );
  }
}
