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


  Users :any =[{}]; 


  constructor(public home:HomeService, public auth:AuthService){}
  async ngOnInit() {
     debugger;
     this.testimonials= await this.home.GetAllUsertestimonials();
    
   this.Users=await this.home.GetAllUsers();


}


      

    }
  