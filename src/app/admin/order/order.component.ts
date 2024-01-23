import { Component, Input, OnInit, TemplateRef, ViewChild, numberAttribute } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';



import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { MedicinesInOrderComponent } from '../medicines-in-order/medicines-in-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
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
export class OrderComponent implements OnInit{
  
  @ViewChild ('AcceptDailog') callAcceptDialog!:TemplateRef<any>
  @ViewChild('RejectDailog') callRejectDialog!: TemplateRef<any>
  @ViewChild('MedicinInOrder') MedInOrder!: TemplateRef<any>
  dataMedcinInOrder:any;
 constructor(public adminService:AdminServicesService,public dialog: MatDialog ,private router:Router){
 }
 orderId:number=1;
 orderDetails:any=[{}];

a:string="aaa"
 
 openMedicineDialog(obj: any): void {
  this.orderId = obj.orderid; // Store the obj.orderid
   this.adminService.MedicineInOrder(this.orderId);
  debugger
  this.orderDetails=this.adminService.medicineInOrder;
  const dialogRef = this.dialog.open(MedicinesInOrderComponent, {
    width: '1000px',
    data: { medicineDetails: obj,orderDetails:this.orderDetails }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

  ngOnInit(): void {
    debugger
    this.adminService.GetAllInformationOrders();
  }


  orders: FormGroup = new FormGroup({
    orderid: new FormControl(),
    username: new FormControl(),
    approval: new FormControl(),
    orderprice: new FormControl(),
    status: new FormControl(),
    orderdate: new FormControl(),
  })

  pData: any;

  Accept(obj: any) {
     
    this.pData = obj;
    this.orders.controls['orderid'].setValue(this.pData.orderid);
    this.orders.controls['approval'].setValue("Accepted");

    const dialogRef = this.dialog.open(this.callAcceptDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
         
        this.adminService.AcceptOrders(this.orders.value);
      } else {
         
        console.log('cancel');
      }
    });
  }

  Reject(obj: any) {
     
    this.pData = obj;
    this.orders.controls['orderid'].setValue(this.pData.orderid);
    this.orders.controls['approval'].setValue("Rejected");

    const dialogRef = this.dialog.open(this.callRejectDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
         
        this.adminService.RejectOrders(this.orders.value);
      } else {
         
        console.log('cancel');
      }
    });
  }
  MedicineinOrder(id:number){
     
    this.router.navigate(['admin/medicineInOrder'], { queryParams: { id } });  }
  // this.route.queryParams.subscribe(params => {
  //   this.id = params['id'];}
}