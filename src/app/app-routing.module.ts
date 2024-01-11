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
import { ShopComponent } from './shop/shop.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { authorizationGuard } from './authorization.guard';

const routes: Routes = [
  {
    path: 'product-result', 
    component: ProductResultComponent,
    canActivate: [authorizationGuard]


  },
  {
    path: 'about', 
    component: AboutusComponent,
    


  },
  {
    path: 'services', 
    component: ShopComponent,
    canActivate: [authorizationGuard]


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
    component:OrderByPrescriptionComponent,
    canActivate: [authorizationGuard]
  }
  ,
 
  {
    path:"map",
    component:MapComponent,
    canActivate: [authorizationGuard]
  },
  
  {
    path:"cart",
    component:CartComponent,
    canActivate: [authorizationGuard]
  },
  
  {
    path:"checkout",
    component:CheckoutComponent,
    canActivate: [authorizationGuard]
  },

  {
    path:'security',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
   

  },
   { path:'admin', 
    loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)
    ,canActivate:[authorizationGuard]
  }, 
  {
    path:'userdashboard', 
    loadChildren:()=>import('./user-dashboard/user-dashboard.module').then((m)=>m.UserDashboardModule)
  },

  {
    path:"payment",
    component:PaymentComponent
  },

  // {
  //   path:"payment",
  //   component:PaymentComponent
  // },
  // {
  //   path:"confirm",
  //   component:ConfirmationComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
