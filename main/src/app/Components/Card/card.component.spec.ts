import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { CardDialog } from "./card-dialog/card-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { TextFieldModule } from "@angular/cdk/text-field";
import Card from "./card.component";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material";

describe("AppComponent", () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Card, CardDialog],
      imports: [
        MatDialogModule,
        MatIconModule,
        TextFieldModule,
        FormsModule,
        MatFormFieldModule
      ],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });
});
