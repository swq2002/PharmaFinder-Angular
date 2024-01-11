import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Import MatDatepickerModule
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DataTablesModule } from 'angular-datatables';
import { NgChartsModule } from 'ng2-charts'; // Import NgChartsModule
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { MedicineComponent } from './medicine/medicine.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { AcceptComponent } from './accept/accept.component';
import { OrderComponent } from './order/order.component';
import { MedicinesInOrderComponent } from './medicines-in-order/medicines-in-order.component';
import { FiltarByPharmacyNamePipe } from '../pipes/filtar-by-pharmacy-name.pipe';
import { FiltarByMedcineNamePipe } from '../pipes/filtar-by-medcine-name.pipe';
import { ManageHomePageComponent } from './manage-home-page/manage-home-page.component';
import { ManageAboutPageComponent } from './manage-about-page/manage-about-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReportComponent } from './report/report.component';
import { SearchsalesComponent } from './searchsales/searchsales.component';

import { GetAllMedcineInPharmacyComponent } from './get-all-medcine-in-pharmacy/get-all-medcine-in-pharmacy.component';
import { PharmacydetailsComponent } from './pharmacydetails/pharmacydetails.component';

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
    FiltarByPharmacyNamePipe,
    FiltarByMedcineNamePipe,
    ReportComponent,
    SearchsalesComponent,
    GetAllMedcineInPharmacyComponent,
    PharmacydetailsComponent,
    ManageHomePageComponent,
    ManageAboutPageComponent,
    EditProfileComponent,
    ReportComponent
    

  ],
  imports: [
    CommonModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    NgChartsModule,
    
  ]
})
export class AdminModule { }
