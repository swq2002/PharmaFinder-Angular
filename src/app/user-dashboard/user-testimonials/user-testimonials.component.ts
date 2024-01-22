import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { CreateTestimonialComponent } from '../create-testimonial/create-testimonial.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-testimonials',
  templateUrl: './user-testimonials.component.html',
  styleUrls: ['./user-testimonials.component.css']
})
export class UserTestimonialsComponent implements OnInit{
  currentUser: any;
testimonials:any;
  constructor(public home:HomeService, public dialog: MatDialog, public auth:AuthService, public router: Router){}
 async ngOnInit() {
    this.testimonials=await this.home.GetAllUsertestimonials();

  }

  OpenCreateDialog(){
    this.dialog.open(CreateTestimonialComponent)
}

goToLogin(){
  this.router.navigate(['security/login']);
}

logout(){
  localStorage.clear();
  this.goToLogin();
  }

}
