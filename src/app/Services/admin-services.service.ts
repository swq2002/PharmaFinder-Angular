import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {
  pharmacy: any = [{}];
  medicine: any = [{}];
  contact: any = [{}];
  testimonial: any = [{}];
  str: string = "message";

  constructor(private http: HttpClient) {}

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
        this.medicine = resp;
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
    this.http.delete('https://localhost:7274/api/Pharmacy/DeletePharmacy/'+id).subscribe((resp)=>{
      alert("deleted");
    },
    (err)=>{
      alert("some think ronge");

      console.log(err.message);
      console.log(err.status);
    })
  }

  DeleteContactUsByID(id:number){
    this.http.delete('https://localhost:7274/api/ContactUs/DeleteContactUs/'+id).subscribe((resp)=>{
      alert("deleted");
    },
    (err)=>{
      alert("some think ronge");

      console.log(err.message);
      console.log(err.status);
    })
  }
  DeleteMedicineByID(id:number){
    this.http.delete('https://localhost:7274/api/Medicine/DeleteMedicine/'+id).subscribe((resp)=>{
      alert("deleted");
    },
    (err)=>{
      alert("some think ronge");

      console.log(err.message);
      console.log(err.status);
    })
  }


}
