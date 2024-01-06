import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';


@NgModule({
  declarations: [
    CreateTestimonialComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule
  ]
})
export class UserDashboardModule { }
