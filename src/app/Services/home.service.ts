import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient,private spinner:NgxSpinnerService) { }
  GetHome() {
    return this.http.get('https://localhost:7274/api/Home/GetHomeById/' + 1);
  }
  GetAbout() {
    return this.http.get('https://localhost:7274/api/About/GetAboutById/' + 1);
  }



}
