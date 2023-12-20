import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,

  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ]

})
export class SharedModule { }
