import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LanguagesApiService {


  constructor(private http:HttpClient) { }

  getLanguages(){
    return this.http.get('/api/languages');
  }
}
