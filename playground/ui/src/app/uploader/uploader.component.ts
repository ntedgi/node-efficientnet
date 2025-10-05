import { Component, OnInit, ViewChild } from '@angular/core';
import Prediction from '../interfces';
import { RecentPredictionsComponent } from '../recent-predictions/recent-predictions.component';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  @ViewChild(RecentPredictionsComponent) recentPredictionsComponent: RecentPredictionsComponent;
  
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
    
    // Refresh recent predictions when a new prediction is made
    if (this.recentPredictionsComponent) {
      setTimeout(() => {
        this.recentPredictionsComponent.loadRecentPredictions();
      }, 1000); // Small delay to ensure server has processed the prediction
    }
  }

  resetFields(){
    this.image2Display=null;
    this.classifications=null;
    this.loading=false;
  }

  ngOnInit(): void {}
}
