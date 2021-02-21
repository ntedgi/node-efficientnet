import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjectorService {

  constructor(private http: HttpClient) { }

  getObjects(): Promise<object> {
    return this.http.get<object>('/api/objects').toPromise();
  }
}
