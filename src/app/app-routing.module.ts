import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [

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
  },
  {
    path:"security",
    loadChildren:() => AuthModule
  },
  {
    path:'map',
    component:MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
