import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagepharmacyComponent } from './managepharmacy/managepharmacy.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { MedicineComponent } from './medicine/medicine.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManagepharmacyComponent,
    SidebarComponent,
    ContactUsComponent,
    TestimonialComponent,
    MedicineComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
