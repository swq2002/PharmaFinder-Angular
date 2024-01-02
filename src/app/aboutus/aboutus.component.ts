import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  aboutData:any
    constructor(public home:HomeService){}
    ngOnInit(): void {
      this.home.GetAbout().subscribe(
        (data) => {
          this.aboutData = data;
        },
        (err) => {
          console.error(err); 
        }
      );
    }

}
