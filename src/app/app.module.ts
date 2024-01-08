import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/interceptor/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SharedModule } from './shared/shared.module';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FormsModule } from '@angular/forms'; 
import { ProductResultComponent } from './product-result/product-result.component';
import { OrderByPrescriptionComponent } from './order-by-prescription/order-by-prescription.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { FiltarByPharmacyNamePipe } from './pipes/filtar-by-pharmacy-name.pipe';
import { FiltarByMedcineNamePipe } from './pipes/filtar-by-medcine-name.pipe';
import { ShopComponent } from './shop/shop.component';
import { DataTablesModule } from "angular-datatables";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    TestimonialComponent,
    ProductResultComponent,
    OrderByPrescriptionComponent,
    CheckoutComponent,
    CartComponent,
    ShopComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    NgxSpinnerModule,
    DataTablesModule
    ],
  
  
  providers: [{
    provide:HTTP_INTERCEPTORS, 
    useClass:TokenInterceptor, 
    multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
