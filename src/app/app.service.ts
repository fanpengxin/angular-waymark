import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  public constructor(private http: HttpClient) {}
  public fetchUserData(): Observable<User[]> {
    return this.http.get<User[]>('/api/values');
  }
}
