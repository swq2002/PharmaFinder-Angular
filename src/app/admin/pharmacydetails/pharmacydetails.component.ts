import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { MedicinesInOrderComponent } from '../medicines-in-order/medicines-in-order.component';

@Component({
  selector: 'app-pharmacydetails',
  templateUrl: './pharmacydetails.component.html',
  styleUrls: ['./pharmacydetails.component.css']
})
export class PharmacydetailsComponent {
  @Output() pharmacyInDetals =new EventEmitter
  @ViewChild ('AcceptDailog') callAcceptDialog!:TemplateRef<any>
  @ViewChild('RejectDailog') callRejectDialog!: TemplateRef<any>
  @ViewChild('MedicinInOrder') MedInOrder!: TemplateRef<any>
  constructor(private route: ActivatedRoute, public adminService: AdminServicesService, public dialog: MatDialog) {}

  itemId: number = 0;
  filterMedicine:string='';

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => this.itemId = Number(queryParams['id'])
    );
    debugger;
    this.adminService.GetAllMedcineInPharmmacy(this.itemId);
    this.adminService.GetAllOrdersInPharmmacy(this.itemId);
    this.adminService.GetMedicineCountInPharmacy(this.itemId);
    this.adminService.SalesPharmacy(this.itemId);
    this.adminService.GetAllOrderMedsByOrderIdInPharmacy(this.itemId);
  }
  orderId:number=1;
  orderDetails:any=[{}];
 
  
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
 

  orders: FormGroup = new FormGroup({
    orderid: new FormControl(),
    username: new FormControl(),
    pharmacyname: new FormControl(),
    approval: new FormControl(),
    orderprice: new FormControl(),
    status: new FormControl(),
    orderdate: new FormControl(),
  })
    

  pData: any;

  Accept(obj: any) {
    debugger;
    this.pData = obj;
    this.orders.controls['orderid'].setValue(this.pData.orderid);
    this.orders.controls['approval'].setValue("Accepted");

    const dialogRef = this.dialog.open(this.callAcceptDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        debugger;
        this.adminService.AcceptOrders(this.orders.value);
      } else {
        debugger;
        console.log('cancel');
      }
    });
  }

  Reject(obj: any) {
    debugger;
    this.pData = obj;
    this.orders.controls['orderid'].setValue(this.pData.orderid);
    this.orders.controls['approval'].setValue("Rejected");

    const dialogRef = this.dialog.open(this.callRejectDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        debugger;
        this.adminService.RejectOrders(this.orders.value);
      } else {
        debugger;
        console.log('cancel');
      }
    });
  }



}
