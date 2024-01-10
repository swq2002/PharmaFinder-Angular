
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { MedicineComponent } from './medicine/medicine.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
 import { SharedModule } from '../shared/shared.module';
 import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule

import { share } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { UserComponent } from './user/user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { AcceptComponent } from './accept/accept.component';
import { OrderComponent } from './order/order.component';
import { MedicinesInOrderComponent } from './medicines-in-order/medicines-in-order.component';
import { TestComponent } from './test/test.component';
import { FiltarByPharmacyNamePipe } from '../pipes/filtar-by-pharmacy-name.pipe';

import { FiltarByMedcineNamePipe } from '../pipes/filtar-by-medcine-name.pipe';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ContactUsComponent,
    TestimonialComponent,
    MedicineComponent,
    FooterComponent,
    NavbarComponent,
    UserComponent,
    PharmacyComponent,
    AcceptComponent,
    OrderComponent,
    MedicinesInOrderComponent,
    TestComponent,
    FiltarByPharmacyNamePipe,
    FiltarByMedcineNamePipe,
    ReportComponent
    

    
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,

    
    
  ]
})
export class AdminModule { }
