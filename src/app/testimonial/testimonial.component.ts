import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { HomeService } from '../Services/home.service';


@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],

})
export class TestimonialComponent implements OnInit {
 


  

  constructor(public home:HomeService){}
  ngOnInit(): void {
   this.home.GetAllUsertestimonials();
   this.home.GetAllUsers();
   console.log(this.home.testimonials);

}

      @ViewChild('testimonialContainer', { static: true }) testimonialContainer!: ElementRef;


      // ngOnInit1() {
      //   this.startAutoScroll();
      // }
    
      // ngOnDestroy() {
      //   this.stopAutoScroll();
      // }
    
      // scroll(direction: number): void {
      //   const container = this.testimonialContainer.nativeElement;
      //   const currentScroll = container.scrollLeft;
      //   const newScroll = currentScroll + direction * this.calculateCardWidth() * this.scrollAmount;
    
      //   container.scrollTo({
      //     left: newScroll,
      //     behavior: 'smooth'
      //   });
      // }
    
      // private startAutoScroll(): void {
      //   this.intervalId = setInterval(() => {
      //     this.scroll(1); 
      //   }, 3000); 
      // }
    
      // private stopAutoScroll(): void {
      //   clearInterval(this.intervalId);
      // }
    
      // private calculateCardWidth(): number {
      //   return 370;
      // }
    
      

    }
  