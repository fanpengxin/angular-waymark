import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ReversePipe } from './reverse.pipe';

interface User {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, HttpClientModule, ReversePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
  
export class AppComponent implements OnInit {
  title = 'my-app';
  newString = "JASON";
  convertString = 'JASON';
  users: User[] = [];

  constructor(
    private http: HttpClient, 
    private reversePipe: ReversePipe
  ) { }

  ngOnInit() {
    this.getUsersOriginal();
  }

  onBlurEvent() {
    this.getReverseString(this.newString);
  }
  getUsersAndReverse() {
     const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain, */*',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    this.http.get<User[]>('http://localhost:5001/api/values').subscribe(
      (result) => {
        this.users = result;
        this.users.forEach(item => {
          item.name = this.reversePipe.transform(item.name);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUsersOriginal() {
     const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain, */*',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    this.http.get<User[]>('http://localhost:5001/api/values').subscribe(
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
    var newUsers = this.users.filter(user => user.age > 10);
    this.users = newUsers;
  }

  getReverseString(value: string): string {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain, */*',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
   
    this.http.get<string>(`http://localhost:5001/weatherforecast/ReverseString?input=${value}`, httpOptions).subscribe(result => {
      this.convertString = result;
      return result;
    },
      (error) => {
        console.error(error);
        return ''
      }
    );
    return '';
  }
}
  
