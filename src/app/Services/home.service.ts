import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
interface Order {
  status: string;
  // other properties...
}
@Injectable({
  providedIn: 'root'
})

export class HomeService{
  private apiUrl = 'https://localhost:7274/api/Orders'; // Replace with your actual API URL

  registeredEmails: any = [];
  private notifyUserSubject = new Subject<string>();
  testimonials:any=[{}];

  constructor(private http: HttpClient,private spinner:NgxSpinnerService, private toastr: ToastrService, private auth:AuthService){ }

  user= this.auth.getCurrentUser();

  GetHome() {
    return this.http.get('https://localhost:7274/api/Home/GetHomeById/' + 1);
  }
  GetAbout() {
    return this.http.get('https://localhost:7274/api/About/GetAboutById/' + 1);
  }


     createOrder(orderData: any) {
    return this.http.post(`${this.apiUrl}/CreateOrder`, orderData);
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
         
        this.http.post('https://localhost:7274/api/User/UploadImage', file).subscribe((resp:any)=>{
        this.display_image = resp.profileimage;
        this.spinner.hide();

        },err=>{ 
          console.log(err.message);
          console.log(err.status);
        })
      }
     

    GetAllUsertestimonials(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get('https://localhost:7274/api/UserTestimonial/GetAllUsertestimonials')
          .subscribe(
            (resp: any) => {
              resolve(resp);
              debugger;
            },
            (err) => {
              console.log(err.message);
              console.log(err.status);
              reject(err);
            }
          );
      });
    }
  
    
    Users :any =[]; 
    GetAllUsers(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get('https://localhost:7274/api/User/GetAllUsers')
          .subscribe(
            (resp: any) => {
              resolve(resp);
            },
            (err) => {
              console.log(err.message);
              console.log(err.status);
              reject(err);
            }
          );
      });
    }
    

    CreateTestimonial(body: any){
    body.userid=this.user.userid;
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
      this.toastr.success("Thank you for contacting us. Wait for an email")

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


 orders1: Order[] = [];
paidOrderCount: number = 0;

GetAllInformationOrders1() {
  const user = this.auth.getCurrentUser();

  this.http.get<Order[]>(`https://localhost:7274/api/Orders/GetOrdersByUserId/${user.userid}`).subscribe(
    (resp: Order[]) => {
      this.orders = resp;

      const paidOrders = this.orders.filter((order: Order) => order.status === 'Paid');

      this.paidOrderCount = paidOrders.length;
    },
    err => {
      console.log(err.message);
      console.log(err.status);
    }
  );
}


    scrollToSection(sectionId: string) {
      const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    }
   

}


