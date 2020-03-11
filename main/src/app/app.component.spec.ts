import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { DebugElement } from "@angular/core";
import { TaskService } from "./Services/task.service";
import { ToastrService, ToastrModule } from "ngx-toastr";
import Column from "./Components/Column/column.componet";
import Card from "./Components/Card/card.component";
import { AddCard } from "./Components/Column/add-card/add-card.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TextFieldModule } from "@angular/cdk/text-field";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, Column, Card, AddCard],
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
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });
});
