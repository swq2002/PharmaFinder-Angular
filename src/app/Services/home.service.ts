import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService{
  
  registeredEmails: any = [];
  private notifyUserSubject = new Subject<string>();

  constructor(private http: HttpClient,private spinner:NgxSpinnerService, private toastr: ToastrService){ }

  GetHome() {
    return this.http.get('https://localhost:7274/api/Home/GetHomeById/' + 1);
  }
  GetAbout() {
    return this.http.get('https://localhost:7274/api/About/GetAboutById/' + 1);
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
            this.notifyUserSubject.next('You already have an account!');
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
        debugger;
        this.http.post('https://localhost:7274/api/User/UploadImage', file).subscribe((resp:any)=>{
        this.display_image = resp.Profileimage;
        },err=>{ 
          console.log(err.message);
          console.log(err.status);
        })
      }
     

    testimonials:any=[{}];
    GetAllUsertestimonials():void{
      this.http.get('https://localhost:7274/api/UserTestimonial/GetAllUsertestimonials').subscribe((resp)=>{
      this.testimonials = resp;
    },err=>{ 
      console.log(err.message);
      console.log(err.status);
    })
    }
    
    Users :any =[]; 
    GetAllUsers()
    {
      this.http.get('https://localhost:7274/api/User/GetAllUsers').subscribe((resp)=>{
        this.Users = resp; 
      }, err=>{
        console.log(err.message);
        console.log(err.status);
      })
    }

    CreateTestimonial(body: any){
      //body.userid=2;
    this.http.post('https://localhost:7274/api/UserTestimonial/CreateUsertestimonial',body).subscribe((resp) =>{
      alert('Created')
    },
    err=>
    alert('something want wrong'))
  window.location.reload();

    }

    orders:any=[{}];
    GetAllInformationOrders(){
      this.http.get('https://localhost:7274/api/Orders/GetAllInformationOrders').subscribe((resp)=>{
        this.orders=resp;
      },err=>{
        console.log(err.message);
        console.log(err.status);
      });
    }
    
   
}


