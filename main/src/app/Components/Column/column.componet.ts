import {
  Component,
  Input,
  Output,
  HostListener,
  EventEmitter
} from "@angular/core";

import { TaskService } from "../../Services/task.service";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

import ITask from "../../Interfaces/Task.interface";

@Component({
  selector: "column",
  templateUrl: "./column.component.html",
  styleUrls: ["./column.component.scss"]
})
export default class Column {
  @Input() cards: ITask[];
  @Input() taskIDs: [number];
  @Input() drop: Function;
  @Input() name: string;
  @Input() category: string;

  @Output() amendedTask: EventEmitter<{
    data: ITask;
    action: string;
  }> = new EventEmitter();

  tasks: Observable<ITask[]>;
  showAddTaskCard: boolean = false;
  submitNewTaskCard: boolean = false;
  highlighted: boolean = false;

  constructor(
    private _taskService: TaskService,
    private toastr: ToastrService
  ) {}

  changeCard(changes: { data: ITask; action: string }) {
    if (changes) {
      this.amendedTask.emit(changes);
    }
  }

  highlight(highlightDropList: boolean) {
    this.highlighted = highlightDropList;
  }

  @HostListener("document:click")
  clickout() {
    // Submit task card if visible and out of focus
    if (this.showAddTaskCard) {
      this.submitNewTaskCard = !this.submitNewTaskCard;
    }
  }

  addCard(task: ITask) {
    if (task.description.trim() != "") {
      task.id = Math.max(...this.taskIDs) + 1;
      task.category = this.category;
      this._taskService.addTask(task);
      this.cards.push(task);
      this.taskIDs.push(task.id);
      this.submitNewTaskCard = false;
    }

    this.showAddTaskCard = !this.showAddTaskCard;
  }

  showAddTask() {
    this.showAddTaskCard = !this.showAddTaskCard;
  }
}
