import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecentPredictionEntry } from './interfces';


@Injectable({
  providedIn: 'root'
})
export class LanguagesApiService {


  constructor(private http:HttpClient) { }

  getLanguages(){
    return this.http.get('/api/languages');
  }

  getRecentPredictions(): Observable<RecentPredictionEntry[]> {
    return this.http.get<RecentPredictionEntry[]>('/api/recent-predictions');
  }
}
