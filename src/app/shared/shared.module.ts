import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Navbar2Component } from './navbar2/navbar2.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    Navbar2Component  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedRoutingModule,
    

  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    Navbar2Component
  ]

})
export class SharedModule { }
