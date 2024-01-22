import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { HttpClient } from '@angular/common/http';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeData: any;


  constructor(public home: HomeService, private http: HttpClient) {}

  ngOnInit(): void {
    this.home.GetHome().subscribe(
      (data) => {
        this.homeData = data;
      },
      (err) => {
        console.error(err);
      }
    );
   


    document.addEventListener('DOMContentLoaded', function () {
      const slider = document.querySelector('.ltn__slide-one-active') as HTMLElement;
    
      if (slider) {
          $(slider).slick({
              autoplay: false,
              arrows: true,
              dots: true,
              prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
              nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
          }).on('afterChange', function () {
              // Your code after slide change (e.g., initializing animations)
          });
      }
    });

  }
  numberOfUsersRegistered: any = {};

  NumberOfUsersRegistered() {
     
    this.http.get('https://localhost:7274/api/User/GetUserCount').subscribe(
      (resp) => {
         
        this.numberOfUsersRegistered = resp;
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }
}
