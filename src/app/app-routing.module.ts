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
    path:'login',
    component:LoginComponent,
    
  },
  {
    path:'security',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    
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
    path:'admin', 
    loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
