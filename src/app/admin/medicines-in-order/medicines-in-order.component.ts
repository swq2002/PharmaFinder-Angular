import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-medicines-in-order',
  templateUrl: './medicines-in-order.component.html',
  styleUrls: ['./medicines-in-order.component.css'],
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
export class MedicinesInOrderComponent {
  @Input() item :any; 
  constructor(public adminService:AdminServicesService,public route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any){
   
    console.log('ahmad');
    console.log(data);  // Check what data you are receiving
    console.log(data.orderDetails);  // Check the orderDetails array
  
  }
  Id:number=0;

  dtOptions: DataTables.Settings = {};
  
  medinInOrder:any=this.data;
  
   ngOnInit() {
     
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    //  this.route.queryParams.subscribe(params => {this.Id = params['id'] } );
    //  this.adminService.MedicineInOrder(this.Id);
    //  this.medinInOrder=await this.adminService.medicineInOrder;
     
  }
  



}