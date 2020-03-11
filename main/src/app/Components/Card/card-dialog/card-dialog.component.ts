import {
  Component,
  OnInit,
  Inject,
  NgZone,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
import ETaskAction from "../../../Enums/task-actions.enum";
import ITask from "src/app/Interfaces/Task.interface";

@Component({
  selector: "card-dialog",
  templateUrl: "./card-dialog.component.html",
  styleUrls: ["./card-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CardDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    private dialogRef: MatDialogRef<CardDialog>,
    private _ngZone: NgZone
  ) {}

  @ViewChild("autosize", null) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  save() {
    const result = { data: this.data, action: ETaskAction.Save };
    this.dialogRef.close(result);
  }

  onKeydown(event) {
    event.preventDefault();
  }

  delete() {
    const result = { data: this.data, action: ETaskAction.Delete };
    this.dialogRef.close(result);
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
