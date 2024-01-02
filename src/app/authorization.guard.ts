import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authorizationGuard: CanActivateFn = (route, state) => {
//const router = new Router(); 
 //let toastr:ToastrService= inject(ToastrService);
  const token = localStorage.getItem('token');
  console.log(state);
  if(token){
    //   if(state.url.indexOf('admin')>0) {

    //       let user :any = localStorage.getItem('user'); //string 
    //       user = JSON.parse(user);
    //       if(user.roleid=='1')
    //       {
    //  toastr.success('Welcome in Admin dashboard');
    //         return true; 
    //       }
    //       else //roleid != 1 
    //       {
    //         toastr.warning('This page for admin module');
    //        router.navigate(['security/login']);
    //          return false ; 
    //       }
    //   }
     return true;
  }
 else //not user in the system 
 {
  // toastr.warning('Please sign up');
  // router.navigate(['security/register']);
return false;
 }



};