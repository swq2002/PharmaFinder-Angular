import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Make sure NgbModule is imported
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptor } from 'src/interceptor/token.interceptor'; // Check if the path is correct
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ProductResultComponent } from './product-result/product-result.component';
import { OrderByPrescriptionComponent } from './order-by-prescription/order-by-prescription.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DataTablesModule } from "angular-datatables";
import { NgChartsModule } from 'ng2-charts';
import { SlickCarouselModule } from 'ngx-slick-carousel';
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
    PaymentComponent,
    ConfirmationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule, // Make sure NgbModule is properly imported
    SharedModule,
    NgxSpinnerModule,
    DataTablesModule,
    NgChartsModule,
    SlickCarouselModule
    ],
  
  
  providers: [{
    provide:HTTP_INTERCEPTORS, 
    useClass:TokenInterceptor, 
    multi:true
    },
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
