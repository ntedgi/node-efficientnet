import { Component, OnInit } from '@angular/core';
import { ObjectorService } from '../objector.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit {

  constructor(private objectService: ObjectorService) { }

  objects: object[] = []
  ngOnInit(): void {
    this.objectService.getObjects().then((result) => {
      this.objects = Object.keys(result).map(key => ({ "name": result[key] }))
      console.log(this.objects)
    }).catch((err) => {

    });
  }

}
