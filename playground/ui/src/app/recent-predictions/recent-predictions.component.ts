import { Component, OnInit } from '@angular/core';
import { LanguagesApiService } from '../languages-api.service';
import { RecentPredictionEntry } from '../interfces';

@Component({
  selector: 'app-recent-predictions',
  templateUrl: './recent-predictions.component.html',
  styleUrls: ['./recent-predictions.component.scss']
})
export class RecentPredictionsComponent implements OnInit {
  recentPredictions: RecentPredictionEntry[] = [];
  loading = false;

  constructor(private languagesApiService: LanguagesApiService) { }

  ngOnInit(): void {
    this.loadRecentPredictions();
  }

  loadRecentPredictions(): void {
    this.loading = true;
    this.languagesApiService.getRecentPredictions().subscribe({
      next: (predictions) => {
        this.recentPredictions = predictions;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading recent predictions:', error);
        this.loading = false;
      }
    });
  }

  getImageSrc(base64: string): string {
    return `data:image/jpeg;base64,${base64}`;
  }

  getTopPrediction(predictions: any[]): string {
    return predictions && predictions.length > 0 ? predictions[0].label : 'No prediction';
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }
}