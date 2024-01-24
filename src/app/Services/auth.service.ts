import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loginErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  registeredEmails: any = [];
  private notifyUserSubject = new Subject<string>();
  get loginError$(): Observable<boolean> {
    return this.loginErrorSubject.asObservable();
  }

  constructor(private http :HttpClient, private router: Router,private toastr:ToastrService,private spinner:NgxSpinnerService) { }
  
  
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
        this.router.navigate(['admin/dashboard']);
      }
      else
      this.router.navigate([''])
      this.toastr.success('Welcome');
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      console.log('Error');
    });
  }

  CreateUserGmail(body: any) {
    debugger;
    //  const user = {username:body.name, email:body.email,profileimage:body.photoUrl,roleid:2,password:123456789};
    // const user = this.getCurrentUser();
    body.email = body.email
    body.username = body.name
    body.Profileimage = body.photoUrl
    body.roleId = 2;
    body.password = "123456789";
    this.http.post('https://localhost:7274/api/User/CreateUser', body).subscribe(resp => {
      this.login(body.email, body.password)
    }, err => {
      console.log(err.message);
      console.log(err.status);
    })


  }


  getCurrentUser(): any {
     
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }


  GetAllUsersEmail(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7274/api/User/GetAllUsersEmail');
  }
  
  isEmailAlreadyRegistered(email: string): Observable<boolean> {
    return this.GetAllUsersEmail().pipe(
      map(allUserEmails => allUserEmails.some(user => user.email === email))
    );
  }
  
  
  createUser(body: any): Observable<any> {
    const userEmail = body.email;

    return this.isEmailAlreadyRegistered(userEmail).pipe(
      switchMap(isRegistered => {
        if (isRegistered) {
          this.toastr.error("Email already registered")
          return of({ error: 'Email already registered' });
        } else {
          body.Profileimage = this.display_image;
          return this.http.post('https://localhost:7274/api/User/CreateUser', body).pipe(
            catchError(error => {
              console.error('Error creating user:', error);
              return of({ error: 'Error creating user' });
            })
          );
        }
      })
    );
  }


  display_image: any;
  uploadAttachment(file: FormData){
    this.spinner.show();
     
    this.http.post('https://localhost:7274/api/User/UploadImage', file).subscribe((resp:any)=>{
    this.display_image = resp.profileimage;
    this.spinner.hide();

    },err=>{ 
      console.log(err.message);
      console.log(err.status);
    })
  }


}