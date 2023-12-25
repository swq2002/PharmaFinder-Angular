import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagepharmacyComponent } from './managepharmacy/managepharmacy.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { MedicineComponent } from './medicine/medicine.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
 import { SharedModule } from '../shared/shared.module';

import { share } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { UseraccountComponent } from './useraccount/useraccount.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManagepharmacyComponent,
    SidebarComponent,
    ContactUsComponent,
    TestimonialComponent,
    MedicineComponent,
    FooterComponent,
    NavbarComponent,
    UseraccountComponent

    
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule

    
  ]
})
export class AdminModule { }
