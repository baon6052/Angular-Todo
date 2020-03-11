import { Component, Output } from "@angular/core";
import { TaskService } from "./Services/task.service";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import ETaskAction from "./Enums/task-actions.enum";
import ITask from "./Interfaces/Task.interface";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @Output("drop")
  tasks: Observable<ITask[]>;
  taskIDs = [];

  toDoCards: ITask[] = [];
  doingCards: ITask[] = [];
  doneCards: ITask[] = [];

  columns = {};

  constructor(
    private _taskService: TaskService,
    private toastr: ToastrService
  ) {}

  editTaskHelper(changes: { data: ITask; action: string }) {
    if (changes.action == ETaskAction.Save) {
      if (changes.data.category == "ToDo") {
        const card_index = this.toDoCards.findIndex(
          task => task.id == changes.data.id
        );
        this.toDoCards[card_index] = changes.data;
      } else if (changes.data.category == "Doing") {
        const card_index = this.doingCards.findIndex(
          task => task.id == changes.data.id
        );
        this.doingCards[card_index] = changes.data;
      } else if (changes.data.category == "Done") {
        const card_index = this.doneCards.findIndex(
          task => task.id == changes.data.id
        );
        this.doneCards[card_index] = changes.data;
      }
    } else if (changes.action == ETaskAction.Delete) {
      console.log("delted");
      if (changes.data.category == "ToDo") {
        this.toDoCards = this.toDoCards.filter(
          task => task.id != changes.data.id
        );
      } else if (changes.data.category == "Doing") {
        this.doingCards = this.doingCards.filter(
          task => task.id != changes.data.id
        );
      } else if (changes.data.category == "Done") {
        this.doneCards = this.doneCards.filter(
          task => task.id != changes.data.id
        );
      }
    }
  }

  editTask(changes: { data: ITask; action: string }) {
    this.editTaskHelper(changes);

    if (changes.action == ETaskAction.Save) {
      let editTask: ITask = {
        id: changes.data.id,
        label: "Origin-Markets",
        description: changes.data.description,
        category: changes.data.category,
        done: false
      };

      this._taskService.patchTask(editTask);
    } else if (changes.action == ETaskAction.Delete) {
      this._taskService.deleteTask(changes.data.id);
    }
  }

  showSuccess() {
    this.toastr.success("Hello world!", "Toastr fun!");
  }

  drop(event: CdkDragDrop<string[]>) {
    const modifiedTask = event.item.data.card;
    modifiedTask.category = event.container.id;

    if (event.container.id == "Done") {
      this.toastr.success("Congratulations!");
      modifiedTask.done = true;
    } else {
      modifiedTask.done = false;
    }

    this._taskService.patchTask(modifiedTask);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addToColumns(data: ITask[]) {
    data.forEach(task => {
      if (task.category == "ToDo") {
        this.toDoCards.push(task);
      } else if (task.category == "Doing") {
        this.doingCards.push(task);
      } else {
        this.doneCards.push(task);
      }
      this.taskIDs.push(task.id);
    });
  }

  ngOnInit() {
    this._taskService.getTasks().subscribe(data => {
      this.addToColumns(data);
    });
  }
}
