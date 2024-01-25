import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { HomeService } from '../Services/home.service';
import { AuthService } from '../Services/auth.service';


declare var $: any;
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],

})
export class TestimonialComponent implements OnInit {
 
  testimonials:any=[{}];

  slideConfig = {
    infinite: false,
    dots: false,
    arrows: true,
    prevArrow:"<button type='button' class='btn btn-outline-secondary left-arrow'><i class='bi bi-arrow-left-short'></i></button>",
    nextArrow:"<button type='button' class='btn btn-outline-secondary right-arrow'><i class='bi-arrow-right-short'></i></button>",

    slidesToShow:2,
    slidesToScroll: 1,
    swipeToSlide: true, 
    touchThreshold: 100,
    responsive: [
        {
            breakpoint: 992,
            settings: {
              slidesToShow:1,
                slidesToScroll: 1
            }
        }
        ,
        {
            breakpoint: 768,
            
            settings: {
              slidesToShow:1,
                slidesToScroll: 1
            }
        }
        ,
        {
            breakpoint: 576,
            
            settings: {
              slidesToShow:1,
                slidesToScroll: 1
            }
        }
    ]
  };
  Users :any =[{}]; 


  constructor(public home:HomeService, public auth:AuthService){}
  async ngOnInit() {
     this.testimonials= await this.home.GetAllUsertestimonials();
    
   this.Users=await this.home.GetAllUsers();


}


      

    }
  