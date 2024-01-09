import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { faSearch, faSheetPlastic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  aboutData:any
  faSearch = faSearch;
  faReport=faSheetPlastic
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
