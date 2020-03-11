import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  Renderer2,
  ViewEncapsulation
} from "@angular/core";
import ITask from "../../../Interfaces/Task.interface";

@Component({
  selector: "add-card",
  templateUrl: "./add-card.component.html",
  styleUrls: ["./add-card.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AddCard implements OnInit {
  @Input() submit: boolean;
  @Output() add: EventEmitter<ITask> = new EventEmitter();

  @ViewChild("search", null) searchElement: ElementRef;

  task_description = "";

  constructor(private renderer: Renderer2) {
    this.renderer.listen("window", "click", (e: Event) => {
      if (e.target !== this.searchElement.nativeElement && !this.submit) {
        this.addCard();
      }
    });
  }

  addCard() {
    let newTask: ITask = {
      id: null,
      label: "Origin-Markets",
      description: this.task_description,
      category: null,
      done: false
    };

    this.add.emit(newTask);
    this.task_description = "";
  }

  onKeydown(event) {
    event.preventDefault();
  }

  ngAfterViewInit() {
    setTimeout(() => this.searchElement.nativeElement.focus());
  }

  ngOnInit() {}
}
