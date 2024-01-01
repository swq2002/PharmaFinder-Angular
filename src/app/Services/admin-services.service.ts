import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  numberOfMedicine:number=0;
  str: string = "message";

  constructor(private http: HttpClient,private toaster:ToastrService,private spinner:NgxSpinnerService) {}

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

  GetAllMedicine1(): Observable<any> {
    return this.http.get('https://localhost:7274/api/Medicine/GetAllMedicines');
  }
  GetAllMedicine() {
    this.http.get('https://localhost:7274/api/Medicine/GetAllMedicines').subscribe(
      (resp) => {
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
        this.toaster.success('Deleted')
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
    })
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
    })
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
    })
  }

  CreateMedine(obj:any){
    debugger;
    this.spinner.show();
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
  GetAllPharmacyformap() {
    return this.http.get<any>('https://localhost:7274/api/Pharmacy/GetAllPharmacies');
     
   }
  updateMedicine(body:any){
    debugger;
    this.spinner.show();
    this.http.put('https://localhost:7274/api/Medicine/UpdateMedicine/',body).subscribe(()=>
    {
      this.toaster.success('updated')
      this.spinner.hide()
    },err=>{
      this.toaster.error('something went wrong !!')
      this.spinner.hide()
    })
  }

}
