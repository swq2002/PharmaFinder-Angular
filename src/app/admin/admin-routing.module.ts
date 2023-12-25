import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagepharmacyComponent } from './managepharmacy/managepharmacy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { MedicineComponent } from './medicine/medicine.component';
import { useAnimation } from '@angular/animations';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { UserComponent } from './user/user.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';

const routes: Routes = [
  {
    path:'useraccount',
    component:UseraccountComponent
  },
  {
    path:'user',
    component:UserComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'managepharmacy',
    component:ManagepharmacyComponent
  },
  {
    path:'pharmacy',
    component:PharmacyComponent
  },
  {
    path:'Contact',
    component:ContactUsComponent
  },
  {
    path:'Testimonial',
    component:TestimonialComponent
  },
  {
    path:'Medicine',
    component:MedicineComponent
  }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
