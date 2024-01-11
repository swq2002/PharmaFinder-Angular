import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { MedicineComponent } from './medicine/medicine.component';
import { useAnimation } from '@angular/animations';
import { UserComponent } from './user/user.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { OrderComponent } from './order/order.component';
import { MedicinesInOrderComponent } from './medicines-in-order/medicines-in-order.component';
import { ManageHomePageComponent } from './manage-home-page/manage-home-page.component';
import { ManageAboutPageComponent } from './manage-about-page/manage-about-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { ReportComponent } from './report/report.component';
import { SearchsalesComponent } from './searchsales/searchsales.component';
import { PharmacydetailsComponent } from './pharmacydetails/pharmacydetails.component';

const routes: Routes = [
  // {
  //   path: 'admin/pharmacydetails/:pharmacyId',
  //   component: PharmacydetailsComponent,
  //   // other route configurations...
  // },
{
  path:'pharmacydetails',
  component:PharmacydetailsComponent
},


  {
    path:'SearchInOrder',
    component:SearchsalesComponent
  },

  // {
  //   path:'medicineInOrder/:id',
  //   component:MedicinesInOrderComponent
  // },
    
  {
    path:'medicineInOrder',
    component:MedicinesInOrderComponent
  },
  {
    path:'order',
    component:OrderComponent
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
  },
  {
    path:'userAccount',
    component:UserComponent
  },
  {
    path:'ManageHomePage',
    component:ManageHomePageComponent
  },
  {
    path:'ManageAboutPage',
    component:ManageAboutPageComponent
  },
  {
    path:'EditProfile',
    component:EditProfileComponent

   
  },{
    path:'report',
    component:ReportComponent
  }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
