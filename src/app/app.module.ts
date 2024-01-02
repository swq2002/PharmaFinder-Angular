import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { OrderByPrescriptionComponent } from './order-by-prescription/order-by-prescription.component';
import { ProductResultComponent } from './product-result/product-result.component';
import { CartComponent } from './cart/cart.component';
import { MohammadComponent } from './mohammad/mohammad.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    TestimonialComponent,
    OrderByPrescriptionComponent,
    ProductResultComponent,
    CartComponent,
    MohammadComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    
    SharedModule

  ],
  
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
