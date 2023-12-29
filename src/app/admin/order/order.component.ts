import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  @ViewChild ('AcceptDailog') callAcceptDialog!:TemplateRef<any>
  @ViewChild('RejectDailog') callRejectDialog!: TemplateRef<any>

 constructor(public adminService:AdminServicesService,public dialog: MatDialog){
 }


  ngOnInit(): void {
    debugger
    this.adminService.GetAllInformationOrders();
  }


  orders: FormGroup = new FormGroup({
    orderid: new FormControl(),
    userid: new FormControl(),
    pharmacyid: new FormControl(),
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
    this.orders.controls['userid'].setValue(this.pData.userid);
    this.orders.controls['pharmacyid'].setValue(this.pData.pharmacyid);
    this.orders.controls['approval'].setValue("Accepted");
    this.orders.controls['orderprice'].setValue("orderprice");
    this.orders.controls['status'].setValue(this.pData.status);
    this.orders.controls['orderdate'].setValue("orderdate");

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
    this.orders.controls['userid'].setValue(this.pData.userid);
    this.orders.controls['pharmacyid'].setValue(this.pData.pharmacyid);
    this.orders.controls['approval'].setValue("Rejected");
    this.orders.controls['orderprice'].setValue("orderprice");
    this.orders.controls['status'].setValue(this.pData.status);
    this.orders.controls['orderdate'].setValue("orderdate");

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
  MedicineinOrder(id:number){
    debugger;
    this.adminService.MedicineInOrder(id);
  }

}
