import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {
  pharmacy: any = [{}];
  medicine: any = [{}];
  contact: any = [{}];
  testimonial: any = [{}];
  userAccount:any=[{}];
  order:any=[{}];
  medicineInOrder:any=[{}];
idNumber:any=[{}];
  allIformationOrder:any=[{}];

  numberOfMedicine:number=0;
  str: string = "message";

  constructor(private http: HttpClient,private toaster:ToastrService,private spinner:NgxSpinnerService,private router:Router) {}
  GetAllInformationOrders(){
    debugger;
    this.http.get('https://localhost:7274/api/Orders/GetAllInformationOrders').subscribe((resp)=>{
      this.allIformationOrder=resp;
    },err=>{
      console.log(err.message);
      console.log(err.status);
    });
  }
  GetAllOrders(){
    this.http.get('https://localhost:7274/api/Orders/GetAllOrders').subscribe((resp)=>{
      this.order=resp;
    },err=>{
      console.log(err.message);
      console.log(err.status);
    });
  }
  GetAllUserAccount() {
    debugger;
    this.http.get('https://localhost:7274/api/User/GetAllUsers').subscribe(
      (resp) => {
        this.userAccount = resp;
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }
  GetAllPharmacy() {
    this.http.get('https://localhost:7274/api/Pharmacy/GetAllPharmacies').subscribe(
      (resp) => {
        this.pharmacy = resp;
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }


  GetAllMedicine() {
    this.http.get('https://localhost:7274/api/Medicine/GetAllMedicines').subscribe(
      (resp) => {
        debugger;
        this.medicine = resp;
        debugger;
        this.numberOfMedicine=this.medicine.length;
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

  GetAllContactUs() {
    this.http.get('https://localhost:7274/api/ContactUs/GetAllContactUs').subscribe(
      (resp) => {
        this.contact = resp;
      },
      (err) => {
        this.toaster.error('some think error ')

        console.log(err.message);
        console.log(err.status);
      }
    );
  }

  GetAllTestimonial() {
    // Provide a valid URL for your API
    this.http.get('https://localhost:7274/api/UserTestimonial/GetAllUsertestimonials').subscribe(
      (resp) => {
        this.testimonial = resp;
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

  // MedicineInOrder(id: number): Observable<any> {
  //   return this.http.get('https://localhost:7274/api/OrderMed/GetAllOrderMedByOrderID/' + id);
  // }


  MedicineInOrder(id:number){
    debugger;
    this.http.get('https://localhost:7274/api/OrderMed/GetAllOrderMedByOrderID/'+id).subscribe((resp)=>{
      debugger;
      this.medicineInOrder=resp;
      console.log(this.medicineInOrder);
      // this.idNumber=id;
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      console.log(err.message);
      console.log(err.status);
    });
  }
  DeletePharmacyByID(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:7274/api/Pharmacy/DeletePharmacy/'+id).subscribe((resp)=>{
      this.toaster.success('Deleted');
      this.spinner.hide();
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      this.spinner.hide();
      console.log(err.message);
      console.log(err.status);
    });
  }

  DeleteContactUsByID(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:7274/api/ContactUs/DeleteContactUs/'+id).subscribe((resp)=>{
      this.toaster.success('Deleted');  
      this.spinner.hide();
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      this.spinner.hide();
      console.log(err.message);
      console.log(err.status);
    });
  }
  DeleteMedicineByID(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:7274/api/Medicine/DeleteMedicine/'+id).subscribe((resp)=>{
      this.toaster.success('Deleted');
      this.spinner.hide();
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      this.spinner.hide();
      console.log(err.message);
      console.log(err.status);
    });
  }
  DeleteUserAccountByID(id:number){
    debugger;
    this.spinner.show();
    this.http.delete('https://localhost:7274/api/User/DeleteUser/'+id).subscribe((resp)=>{
      this.toaster.success('Deleted');
      this.spinner.hide();
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      this.spinner.hide();
      console.log(err.message);
      console.log(err.status);
    })
  }

  CreateAdminAccount(obj:any){
    debugger;
    this.spinner.show();
  this.http.post('https://localhost:7274/api/User/CreateUser',obj).subscribe((resp)=>{
    this.toaster.success('Created');
    this.spinner.hide();
  },err=>{
    this.toaster.error('something want wrong !!');
    this.spinner.hide();
  })
  window.location.reload();
  }


  CreateMedine(obj:any){
    debugger;
    this.spinner.show();
    obj.imagename=this.display_image;
    
  this.http.post('https://localhost:7274/api/Medicine/CreateMedicine',obj).subscribe((resp)=>{
    this.toaster.success('Created');
    this.spinner.hide();

  },err=>{
    this.toaster.error('something want wrong !!');
    this.spinner.hide();
  })
  window.location.reload();
  }

  CreatedPharmicy(obj:any){
    debugger;
    this.spinner.show();
    this.http.post('https://localhost:7274/api/Pharmacy/CreatePharmacy/',obj).subscribe((resp)=>{
    this.toaster.success('Created')
    this.spinner.hide();


  },err=>{
    this.toaster.error('something want wrong !!');
    this.spinner.hide();
    })
  }

  updateMedicine(body:any){
    debugger;
    this.spinner.show();
    body.imagename=this.display_image;
    this.http.put('https://localhost:7274/api/Medicine/UpdateMedicine/',body).subscribe(()=>
    {
      this.toaster.success('updated')
      this.spinner.hide()
    },err=>{
      console.log(ErrorEvent) 


      this.toaster.error('something want wrong !!')
      this.spinner.hide()
    })
  }
  updatePharmacy(body:any){
    debugger;
    this.spinner.show();
    this.http.put('https://localhost:7274/api/Pharmacy/UpdatePharmacy',body).subscribe(()=>
    {
      this.toaster.success('updated')
      this.spinner.hide()
    },err=>{
      console.log(ErrorEvent) 


      this.toaster.error('something want wrong !!')
      this.spinner.hide()
    })
  }
  AcceptTestimonial(body:any){
    debugger;
    this.spinner.show();

    this.http.put('https://localhost:7274/api/UserTestimonial/AcceptOrRejectTestimonial',body).subscribe(()=>
    {
      this.toaster.success('Accepted')
      this.spinner.hide()

      window.location.reload();
    },err=>{
      console.log(ErrorEvent) 
      this.toaster.error('something want wrong !!')
      this.spinner.hide()
    })
  }
  RejectTestimonial(body:any){
    debugger;
    this.spinner.show();
    this.http.put('https://localhost:7274/api/UserTestimonial/AcceptOrRejectTestimonial',body).subscribe(()=>
    {
      this.toaster.success('Rejected')
      window.location.reload();
      this.spinner.hide()
    },err=>{
      console.log(ErrorEvent) 
      this.toaster.error('something want wrong !!')
      this.spinner.hide()
      window.location.reload();

    })
  }
  RejectOrders(body:any){
    debugger;
    this.spinner.show();

    this.http.put('https://localhost:7274/api/Orders/AcceptOrRejectOrders',body).subscribe(()=>
    {
      this.toaster.success('Accepted')
      this.spinner.hide();
      window.location.reload();

    },err=>{
      console.log(ErrorEvent) 
      this.toaster.error('something want wrong !!')
      this.spinner.hide()
      window.location.reload();
    })
  }
  AcceptOrders(body:any){
    debugger;

    this.spinner.show();
    this.http.put('https://localhost:7274/api/Orders/AcceptOrRejectOrders',body).subscribe(()=>
    {
      this.toaster.success('Accepted')
      window.location.reload();
      this.spinner.hide()

    },err=>{
      console.log(ErrorEvent) 
      this.toaster.error('something want wrong !!')
      this.spinner.hide()
      window.location.reload();

    })
  }
  display_image:any;
uploadAttachment(file:FormData){
  this.spinner.show();

  this.http.post('https://localhost:7274/api/Medicine/uploadImage',file).subscribe((resp:any)=>
  {
    this.display_image=resp.imagename;
    this.spinner.hide()

  },err=>{
    this.toaster.error('something want wrong !!')
    this.spinner.hide()
  });
}
display_image_user:any;
uploadAttachmentUser(file:FormData){
  this.spinner.show();
debugger;
  this.http.post('https://localhost:7274/api/User/uploadImage',file).subscribe((resp:any)=>
  {
    debugger;
    this.display_image=resp.profileimage;
    this.spinner.hide()
  },err=>{
    this.toaster.error('something want wrong !!')
    this.spinner.hide()
  });
}


}
