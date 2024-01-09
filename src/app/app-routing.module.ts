import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrderByPrescriptionComponent } from './order-by-prescription/order-by-prescription.component';
import { MapComponent } from './map/map.component';
import { ProductResultComponent } from './product-result/product-result.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authorizationGuard } from './authorization.guard';
import { ShopComponent } from './shop/shop.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: 'product-result', 
    component: ProductResultComponent,


  },
  {
    path: 'about', 
    component: AboutusComponent,


  },
  {
    path: 'services', 
    component: ShopComponent,


  },

  {
    path:'security',
    // loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    //,canActivate:[authorizationGuard]
    
  },
  {
    path:'contact',
    component:ContactusComponent
  },
  {
    path:'',
    component:HomeComponent
  },  {
    path:'upload-prescription',
    component:OrderByPrescriptionComponent
  },
  {
    path:'account',
    component:AccountDashboardComponent
  },
  {
    path:"security",
    loadChildren:() => AuthModule
  },
  {
    path:"map",
    component:MapComponent
  },
  
  {
    path:"cart",
    component:CartComponent
  },
  
  {
    path:"checkout",
    component:CheckoutComponent
  },

  {
    path:'security',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    ,canActivate:[authorizationGuard]
   
  },

  {
    path:"payment",
    component:PaymentComponent
  },
  {
    path:"confirm",
    component:ConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
