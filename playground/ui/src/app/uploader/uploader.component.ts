import { Component, OnInit } from '@angular/core';
import Prediction from '../interfces';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  constructor() {}

  image2Display: string | ArrayBuffer;
  classifications: Prediction[];
  loading: boolean;

  updateImage(imgPath: File) {
    const reader = new FileReader();
    reader.readAsDataURL(imgPath);
    reader.onload = (_event) => {
      this.image2Display = reader.result;
    };
  }
  isLoading(loading: boolean) {
    this.loading = loading;
  }

  updateClassification(result: Prediction[]) {
    console.log('updateClassification');
    console.log(result);
    this.classifications = result;
  }

  ngOnInit(): void {}
}
