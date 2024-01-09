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
import { ReportComponent } from './report/report.component';

const routes: Routes = [

{
  path:'pharmacydetails',
  component:PharmacydetailsComponent
},
  {
    path:'SearchInOrder',
    component:SearchsalesComponent
  },

  {
    path:'medicineInOrder/:id',
    component:MedicinesInOrderComponent
  },
    
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
    path:'report',
    component:ReportComponent
  }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
