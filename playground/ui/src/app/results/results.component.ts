import { Component, Input, OnInit, OnChanges } from "@angular/core";
import Prediction from "../interfces";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit, OnChanges {


  @Input() image2Display: string | ArrayBuffer;
  @Input() loading: boolean;
  @Input() classifications: Prediction[];

  constructor() {
  }

  show(): boolean {
    if (this.loading === undefined) {
      return false;
    }
    return this.loading;
  }

  ngOnChanges() {
  }

  ngOnInit(): void {
  }

}
