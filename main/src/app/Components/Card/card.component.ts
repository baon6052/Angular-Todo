import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CardDialog } from "./card-dialog/card-dialog.component";

import ITask from "../../Interfaces/Task.interface";
import ETaskAction from "../../Enums/task-actions.enum";

@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export default class Card {
  @Input("cardId") cardId: number;
  @Input("description") description: string;
  @Input("label") label: string;
  @Input("category") category: string;
  @Input("done") done: boolean;

  @Output() changes: EventEmitter<{
    data: ITask;
    action: string;
  }> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openCardDialog() {
    console.log("Editing cardID", this.category);

    let dialogRef = this.dialog.open(CardDialog, {
      data: {
        id: this.cardId,
        description: this.description,
        label: this.label,
        category: this.category,
        done: this.done
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:", result);
      if (result) {
        if (result.action == ETaskAction.Save) {
          result.data.description = result.data.description.trim();
          this.description = result.data.description;
          this.label = result.data.category;
          this.category = result.data.category;
          this.done = result.data.done;

          this.changes.emit(result);
        } else if (result.action == ETaskAction.Delete) {
          this.changes.emit(result);
        }
      }
    });
  }
}
