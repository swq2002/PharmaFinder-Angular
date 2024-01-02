import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient, private router: Router) { }

  body:any;
  login(username:any, password:any){
    debugger
    this.body={
      username:username.toString(),
      password:password.toString()
     }
 

    const headerDir ={
      'Content-Type':'application/json', 
      'Accept':'application/json'
    }
    const requestOptions={
      headers: new HttpHeaders(headerDir)
    }

// debugger;
    this.http.post('https://localhost:7274/api/JWT/', this.body, requestOptions).subscribe((resp:any)=>{
      console.log('Welcome');
      console.log(resp);

      const responce={
        token: resp.toString()
      }
      localStorage.setItem('token', responce.token);
      let data: any = jwtDecode(responce.token);
      localStorage.setItem('user',JSON.stringify(data));

      if(data.roleid=='1')
      {
        this.router.navigate([''])
      }
      else
      this.router.navigate(['security/register']);
      //this.toastr.success('Welcome');
      //this.spinner.hide();
    },err=>{
      //this.toastr.error('Error');
      //this.spinner.hide();
      console.log('Error');
    });
  }

}
