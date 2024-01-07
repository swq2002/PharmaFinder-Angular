import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminPharmacyService {

  constructor(private http: HttpClient,private toaster:ToastrService,private spinner:NgxSpinnerService,private router:Router) {}


  GetAllMedcineInPharmmacy(id:number){
    this.spinner.show();
    debugger;
    this.http.get('https://localhost:7274/api/Pharmacy/GetAllMedcineInPharmmacy/'+id).subscribe((resp)=>{
      this.spinner.hide();
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      this.spinner.hide();
      console.log(err.message);
      console.log(err.status);
    });
  }


  GetAllOrdersInPharmmacy(id:number){
    this.spinner.show();
    debugger;
    this.http.get('https://localhost:7274/api/Pharmacy/GetAllOrdersInPharmmacy/'+id).subscribe((resp)=>{
      this.spinner.hide();
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      this.spinner.hide();
      console.log(err.message);
      console.log(err.status);
    });
  }
 
  GetMedicineCountInPharmacy(id:number){
    this.spinner.show();
    debugger;
    this.http.get('https://localhost:7274/api/Pharmacy/GetMedicineCountInPharmacy/'+id).subscribe((resp)=>{
      this.spinner.hide();
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      this.spinner.hide();
      console.log(err.message);
      console.log(err.status);
    });
  }  
  
  SalesPharmacy(id:number){
    this.spinner.show();
    debugger;
    this.http.get('https://localhost:7274/api/Pharmacy/SalesPharmacy/'+id).subscribe((resp)=>{
      this.spinner.hide();
    },
    (err)=>{
      this.toaster.error('something want wrong !!');
      this.spinner.hide();
      console.log(err.message);
      console.log(err.status);
    });
  }


  SalesSearch(obj:any){
    debugger;
    this.spinner.show();
    this.http.post('https://localhost:7274/api/Pharmacy/SalesSearch',obj).subscribe((resp)=>{
    this.spinner.hide();
  },err=>{
    this.toaster.error('something want wrong !!');
    this.spinner.hide();
    })
  }
  
  GetAllOrderMedsByOrderIdInPharmacy(obj:any){
    debugger;
    this.spinner.show();
    this.http.post('https://localhost:7274/api/Pharmacy/GetAllOrderMedsByOrderIdInPharmacy',obj).subscribe((resp)=>{
    this.spinner.hide();
  },err=>{
    this.toaster.error('something want wrong !!');
    this.spinner.hide();
    })
  }





}
