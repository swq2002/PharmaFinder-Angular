import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { CreateTestimonialComponent } from '../create-testimonial/create-testimonial.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-testimonials',
  templateUrl: './user-testimonials.component.html',
  styleUrls: ['./user-testimonials.component.css']
})
export class UserTestimonialsComponent implements OnInit{
  currentUser: any;
  constructor(public home:HomeService, public dialog: MatDialog, public auth:AuthService){}
  ngOnInit(): void {
    this.home.GetAllUsertestimonials();

  }

  OpenCreateDialog(){
    this.dialog.open(CreateTestimonialComponent)
}

}
