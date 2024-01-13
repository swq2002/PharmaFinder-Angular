import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService{
  private apiUrl = 'https://localhost:7274/api/Orders'; // Replace with your actual API URL

  registeredEmails: any = [];
  private notifyUserSubject = new Subject<string>();

  constructor(private http: HttpClient,private spinner:NgxSpinnerService, private toastr: ToastrService, private auth:AuthService){ }

  GetHome() {
    return this.http.get('https://localhost:7274/api/Home/GetHomeById/' + 1);
  }
  GetAbout() {
    return this.http.get('https://localhost:7274/api/About/GetAboutById/' + 1);
  }


     createOrder(orderData: any) {
    return this.http.post(`${this.apiUrl}/CreateOrder`, orderData);
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
      
    DeleteUser(id:number){
      this.spinner.show();
      this.http.delete('https://localhost:7274//api/User/DeleteUser/'+id).subscribe((resp)=>{
        this.toastr.success('Your account has been deleted successfully');
        this.spinner.hide();
      },
      (err)=>{
        this.toastr.error('something want wrong !!');
        this.spinner.hide();
        console.log(err.message);
        console.log(err.status);
      });
    }

      display_image: any;
      uploadAttachment(file: FormData){
        this.spinner.show();
        debugger;
        this.http.post('https://localhost:7274/api/User/UploadImage', file).subscribe((resp:any)=>{
        this.display_image = resp.profileimage;
        this.spinner.hide();

        },err=>{ 
          console.log(err.message);
          console.log(err.status);
        })
      }
     

    testimonials:any=[{}];
    GetAllUsertestimonials():void{
      debugger
      this.http.get('https://localhost:7274/api/UserTestimonial/GetAllUsertestimonials').subscribe((resp)=>{
      this.testimonials = resp;
      debugger;
      console.log(resp);
      
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
     this.toastr.success("Thanks for rating")
    window.location.reload();

    },
    err=>
    alert('something want wrong'))

    }
      SendContactMessage(body: any){
        this.spinner.show();
        this.http.post('https://localhost:7274/api/ContactUs/CreateContactUs',body).subscribe((resp) =>{
      this.spinner.hide();

    },
    err=>
    alert('something want wrong'))

    }

    orders:any=[{}];
    GetAllInformationOrders(){
      const user = this.auth.getCurrentUser();

      
      this.http.get(`https://localhost:7274/api/Orders/GetOrdersByUserId/${user.userid}`).subscribe((resp)=>{
        this.orders=resp;
      },err=>{
        console.log(err.message);
        console.log(err.status);
      });
    }
    scrollToSection(sectionId: string) {
      const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    }
   

}


