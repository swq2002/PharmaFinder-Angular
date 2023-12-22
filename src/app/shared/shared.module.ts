import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

import{HttpClientModule}from  '@angular/common/http'

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatDividerModule


  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MatButtonModule,
    HttpClientModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule

  ]

})
export class SharedModule { }
