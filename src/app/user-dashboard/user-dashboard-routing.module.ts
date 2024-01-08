import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { UserTestimonialsComponent } from './user-testimonials/user-testimonials.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  {
    path:'createTestimonial',
    component:CreateTestimonialComponent
  },
  {
    path:'account',
    component:AccountDashboardComponent
  },
  {
    path:'userTestimonial',
    component:UserTestimonialsComponent
  },
  {
    path:'userOrders',
    component:UserOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
