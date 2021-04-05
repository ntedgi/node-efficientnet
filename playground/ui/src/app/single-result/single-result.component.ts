import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-result',
  templateUrl: './single-result.component.html',
  styleUrls: ['./single-result.component.scss'],
})
export class SingleResultComponent implements OnInit {
  @Input() acc: number;
  @Input() title: string;
  @Input() loading: boolean;

  constructor() {}

  show(): boolean {
    return this.loading;
  }

  ngOnInit(): void {}
}
