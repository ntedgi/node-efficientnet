import { Component, Input, OnInit, OnChanges } from "@angular/core";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit, OnChanges {

  @Input() image2Display: string | ArrayBuffer;

  constructor() {
  }

  ngOnChanges() {
  console.log("chagne")
  }

  ngOnInit(): void {
  }

}
