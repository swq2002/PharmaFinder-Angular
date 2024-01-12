import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-create-testimonial',
  templateUrl: './create-testimonial.component.html',
  styleUrls: ['./create-testimonial.component.css']
})
export class CreateTestimonialComponent {
  testmonial: any = {};

  constructor(public home: HomeService, public auth: AuthService) { }
  testimonialtext:FormControl= new FormControl('', Validators.required)

  

   Save() {
    debugger
    const user =  this.auth.getCurrentUser();
    this.testmonial =  { userid: user.userid, testimonialtext: this.testimonialtext.value }
   
     this.home.CreateTestimonial(this.testmonial);
  }
}
