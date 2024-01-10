import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authorizationGuard: CanActivateFn = (route, state) => {
const router = new Router(); 
 let toastr:ToastrService= inject(ToastrService);
  const token = localStorage.getItem('token');
  console.log(state);
  if(token){
    debugger;
      if(state.url.indexOf('admin')>0) {


          let user :any = localStorage.getItem('user'); //string 
          user = JSON.parse(user);
          if(user.roleid=='1')
          {
     toastr.success('Welcome in Admin dashboard');
            return true; 
          }
          else 
          {
            toastr.warning('This page for admin module');
           router.navigate(['security/login']);
             return false ; 
          }
      }
     
     return true;
  }
 else
 {
  toastr.warning('Please sign in');
  router.navigate(['security/login']);
  return false;
 }



};