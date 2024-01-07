import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-get-all-medcine-in-pharmacy',
  templateUrl: './get-all-medcine-in-pharmacy.component.html',
  styleUrls: ['./get-all-medcine-in-pharmacy.component.css'],
  styles: [`

  table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
  
      th, td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
  
      th {
        background-color: #f2f2f2;
      }
  
    h2 {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
  
    button {
      background-color: #4285f4;
      color: white;
    }
  `]
})
export class GetAllMedcineInPharmacyComponent {
  constructor(public adminService:AdminServicesService,public route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any){
    console.log('ahmad');
     console.log(data);  // Check what data you are receiving
     console.log(data.orderDetails);  // Check the orderDetails array
   
   }
   Id:number=0;
 
   
   medinInOrder:any=this.data;
}
