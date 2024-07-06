import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReversePipe } from './reverse.pipe';
import { AppDataService } from './app.service';
import { User } from './User';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReversePipe,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'my-app';
  newString = 'JASON';
  convertString = 'JASON';
  users: User[] = [];

  constructor(
    private appService: AppDataService,
    private http: HttpClient,
    private reversePipe: ReversePipe
  ) {}

  ngOnInit() {
    this.getForecasts();
    // this.getReverseString('ABC');
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onBlurEvent() {
    this.getReverseString(this.newString);
  }
  getUsersAndReverse() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/plain, */*',
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };

    this.http.get<User[]>('/api/values').subscribe(
      (result) => {
        this.users = result;
        this.users.forEach((item) => {
          item.name = this.reversePipe.transform(item.name);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUsersOriginal() {
    debugger;
    this.appService.fetchUserData().subscribe(
      (result) => {
        this.users = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  sortUser() {
    this.users.sort((i, j) => i.age - j.age);
  }

  selectUsers() {
    var newUsers = this.users.filter((user) => user.age > 10);
    this.users = newUsers;
  }

  getReverseString(value: string): string {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/plain, */*',
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };

    this.http
      .get<string>(`/weatherforecast/ReverseString?input=${value}`, httpOptions)
      .subscribe(
        (result) => {
          this.convertString = result;
          return result;
        },
        (error) => {
          console.error(error);
          return '';
        }
      );
    return '';
  }
}
