import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-create-testimonial',
  templateUrl: './create-testimonial.component.html',
  styleUrls: ['./create-testimonial.component.css']
})
export class CreateTestimonialComponent {
  constructor(public home:HomeService){}
  createTestimonial:FormGroup = new FormGroup({
    testimonialtext:new FormControl('',Validators.required)

  })

  Save(){
    debugger
    this.home.CreateTestimonial(this.createTestimonial.value)
  }
}
