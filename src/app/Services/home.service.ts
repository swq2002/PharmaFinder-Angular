import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://localhost:7274/api/Orders'; // Replace with your actual API URL

  constructor(private http: HttpClient,private spinner:NgxSpinnerService,private toastr: ToastrService) { }
  GetHome() {
    return this.http.get('https://localhost:7274/api/Home/GetHomeById/' + 1);
  }
  GetAbout() {
    return this.http.get('https://localhost:7274/api/About/GetAboutById/' + 1);
  }

    createUser(body: any){
      debugger;
      body.Profileimage=this.display_image;
       this.http.post('https://localhost:7274/api/User/CreateUser', body).subscribe(
              resp => {
                console.log('User created successfully!', resp);
              },
              error => {
                console.error('Error creating user:', error.message);
              }
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


