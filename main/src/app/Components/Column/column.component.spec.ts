import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { AddCard } from "./add-card/add-card.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TaskService } from "src/app/Services/task.service";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { TextFieldModule } from "@angular/cdk/text-field";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";

import Column from "./column.componet";
import Card from "../Card/card.component";

describe("AppComponent", () => {
  let component: Column;
  let fixture: ComponentFixture<Column>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Column, AddCard, Card],
      imports: [
        DragDropModule,
        TextFieldModule,
        FormsModule,
        MatFormFieldModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers: [TaskService, ToastrService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Column);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });
});
