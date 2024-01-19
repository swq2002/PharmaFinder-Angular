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
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loginErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  registeredEmails: any = [];
  private notifyUserSubject = new Subject<string>();
  socialAuthService: any;
  get loginError$(): Observable<boolean> {
    return this.loginErrorSubject.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) { }


  private setLoginError(value: boolean): void {
    this.loginErrorSubject.next(value);
  }

  body: any;
  login(email: any, password: any) {
    debugger
    this.body = {
      email: email.toString(),
      password: password.toString()
    }


    const headerDir = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDir)
    }

    this.http.post('https://localhost:7274/api/JWT/', this.body, requestOptions).pipe(
      catchError((error) => {
        this.setLoginError(true);
        return throwError(error);
      })
    ).subscribe((resp: any) => {
      console.log('Welcome');
      console.log(resp);

      const responce = {
        token: resp.toString()
      }
      localStorage.setItem('token', responce.token);
      let data: any = jwtDecode(responce.token);
      localStorage.setItem('user', JSON.stringify(data));
      if (data.roleid == '1') {
        this.router.navigate(['admin/dashboard']);
      }
      else
        this.router.navigate([''])
      this.toastr.success('Welcome');
      this.spinner.hide();
    }, err => {
      this.toastr.error('Error');
      this.spinner.hide();
      console.log('Error');
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user: { idToken: any; }) => {
        // Assuming that user object contains the token
        const token = user.idToken;

        // Store the token in local storage
        localStorage.setItem('token', token);

        // You can also store other user-related information if needed
        localStorage.setItem('user', JSON.stringify(user));

        // Continue with your logic or navigate to another page
        // For example, you can call a method to handle user registration or authentication
        this.handleGoogleLogin(user);
      },
      (error: any) => {
        console.log('Error during Google login', error);
        // Handle error if needed
      }
    );
  }
  handleGoogleLogin(user: any) {
    throw new Error('Method not implemented.');
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

  createUser(body: any): Observable<any> {

    const Email = body.email;
    const Password = body.passwrd;
    const subBody = {
      Email: Email.toString(),
      Password: Password.toString(),
    };

    return this.isEmailAlreadyRegistered(Email).pipe(
      switchMap((isRegistered) => {
        if (isRegistered) {
          this.notifyUserSubject.next('You already have an account!');
          return of({ error: 'Email already registered' });
        } else {
          const headerDir = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          };
          const requestOptions = {
            headers: new HttpHeaders(headerDir),
          };

          body.Profileimage = this.display_image;
          return this.http.post('https://localhost:7274/api/User/CreateUser', body, requestOptions).pipe(
            catchError((error) => {
              console.error('Error creating user:', error);
              return of({ error: 'Error creating user' });
            }),
            switchMap((resp: any) => {
              const tokenRequestOptions = {
                headers: new HttpHeaders(headerDir),
              };

              return this.http.post('https://localhost:7274/api/JWT/', subBody, tokenRequestOptions).pipe(
                catchError((error) => {
                  console.error('Error generating token for the registered user:', error);
                  return of({ error: 'Error generating token' });
                }),
                tap((tokenResp: any) => {
                  const responce = {
                    token: tokenResp.toString(),
                  };
                  localStorage.setItem('token', responce.token);
                  let data: any = jwtDecode(responce.token);
                  localStorage.setItem('user', JSON.stringify(data));
                })
              );
            })
          );
        }
      })
    );
  }

  display_image: any;
  uploadAttachment(file: FormData) {
    this.spinner.show();
    debugger;
    this.http.post('https://localhost:7274/api/User/UploadImage', file).subscribe((resp: any) => {
      this.display_image = resp.profileimage;
      this.spinner.hide();

    }, err => {
      console.log(err.message);
      console.log(err.status);
    })
  }

}