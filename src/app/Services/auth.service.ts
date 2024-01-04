import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loginErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get loginError$(): Observable<boolean> {
    return this.loginErrorSubject.asObservable();
  }

  constructor(private http :HttpClient, private router: Router) { }
  private setLoginError(value: boolean): void {
    this.loginErrorSubject.next(value);
  }

  body:any;
  login(email:any, password:any){
    debugger
    this.body={
      email:email.toString(),
      password:password.toString()
     }
 

    const headerDir ={
      'Content-Type':'application/json', 
      'Accept':'application/json'
    }
    const requestOptions={
      headers: new HttpHeaders(headerDir)
    }

    this.http.post('https://localhost:7274/api/JWT/', this.body, requestOptions).pipe(
      catchError((error) => {
        this.setLoginError(true);
        return throwError(error);
      })
    ).subscribe((resp:any)=>{
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
      this.router.navigate(['admin']);
      //this.toastr.success('Welcome');
      //this.spinner.hide();
    },err=>{
      //this.toastr.error('Error');
      //this.spinner.hide();
      console.log('Error');
    });
  }

}