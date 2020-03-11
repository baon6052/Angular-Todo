import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

import Card from "./Components/Card/card.component";
import Column from "./Components/Column/column.componet";

import { TaskService } from "./Services/task.service";
import { CardDialog } from "./Components/Card/card-dialog/card-dialog.component";
import { AddCard } from "./Components/Column/add-card/add-card.component";

@NgModule({
  declarations: [AppComponent, Card, Column, CardDialog, AddCard],
  entryComponents: [CardDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [HttpClient, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {}
