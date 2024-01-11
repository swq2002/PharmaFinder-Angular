import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';
import { UserTestimonialsComponent } from './user-testimonials/user-testimonials.component';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';


@NgModule({
  declarations: [
    CreateTestimonialComponent,
    UserTestimonialsComponent,
    UserOrdersComponent,
    AccountDashboardComponent,
    UserEditProfileComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    SharedModule
    ]
})
export class UserDashboardModule { }
