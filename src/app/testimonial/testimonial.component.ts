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
 


  @ViewChild('slickCarousel') slickCarousel!: ElementRef;


  constructor(public home:HomeService, public auth:AuthService){}
  ngOnInit(): void {
    debugger;
   this.home.GetAllUsertestimonials();
   debugger;

   this.home.GetAllUsers();
   console.log(this.home.testimonials);
////

this.initSlickSlider();

}

private initSlickSlider(): void {
  $('.ltn__testimonial-slider-active').slick({
    arrows: true,
    dots: true,
  });
}
      

    }
  