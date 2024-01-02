import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
homeData:any
  constructor(public home:HomeService){}
  ngOnInit(): void {
    this.home.GetHome().subscribe(
      (data) => {
        this.homeData = data;
      },
      (err) => {
        console.error(err); 
      }
    );
  } 
  





}
