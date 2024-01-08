import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @ViewChild ('callDeleteMedcineDailog') callDeleteMedcine!:TemplateRef<any>
  @ViewChild('CreateMedicineDailog') createMedicine!:TemplateRef<any>
  @ViewChild('updateMedicineDailog') updateMedicine!:TemplateRef<any>
  constructor(private route: ActivatedRoute, public adminService: AdminServicesService, public dialog: MatDialog) {}

  itemId: number = 0;
  filterMedicine:string='';
  test:any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const pharmacyId = params['pharmacyId'];
      console.log('pharmacyId:', pharmacyId);
      // Use pharmacyId as needed in your component logic
    });
    this.route.params.subscribe(params => {
      const pharmacyId = params['pharmacyId'];
      console.log('pharmacyId:', pharmacyId);
      // Use pharmacyId as needed in your component logic
    });
    this.route.queryParams.subscribe(
      queryParams => 
      this.itemId = Number(queryParams['id'])
    );
    debugger;
    this.adminService.GetAllMedcineInPharmmacy(this.itemId);
    this.adminService.GetAllOrdersInPharmmacy(this.itemId);
    this.adminService.GetMedicineCountInPharmacy(this.itemId);
    this.adminService.SalesPharmacy(this.itemId);
    this.adminService.GetAllOrderMedsByOrderIdInPharmacy(this.itemId);
    this.adminService.pharmcyId=(this.itemId);
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



  
    DeleteMedicine(id:number){
    debugger;
    const dialogRef=this.dialog.open(this.callDeleteMedcine);
    dialogRef.afterClosed().subscribe((result)=>{
     if(result=="yes"){
       this.adminService.DeleteMedicineByID(id);
     }
     else{
       console.log('cansele delete');
     }
    })
     
   }


   CreateMedicneInPharmacy:FormGroup=new FormGroup({
    pharmacyid:new FormControl('',Validators.required),
    medicinename:new FormControl('',Validators.required),
    medicineprice:new FormControl('',Validators.required),
    medicinetype:new FormControl('',Validators.required),
    medicinedescription:new FormControl('',Validators.required),
    imagename:new FormControl('',Validators.required),
    quantity:new FormControl('',Validators.required),
    expiredate:new FormControl('',Validators.required),
    activesubstance:new FormControl('',Validators.required)
   })
   
   UpdateMedicne:FormGroup=new FormGroup({
    pharmacyid:new FormControl(),
    phmedid:new FormControl(),
    medicineid:new FormControl(),
    medicinename:new FormControl(),
    medicineprice:new FormControl('',Validators.required),
    medicinetype:new FormControl('',Validators.required),
    medicinedescription:new FormControl('',Validators.required),
    imagename:new FormControl('',Validators.required),
    quantity:new FormControl('',Validators.required),
    expiredate:new FormControl('',Validators.required),
    activesubstance:new FormControl('',Validators.required)
 
  })


   OpenCreateDialog (){
    this.CreateMedicneInPharmacy.controls['pharmacyid'].setValue(this.itemId);
      const dialogRef=this.dialog.open(this.createMedicine);
   }

   Create() {
      this.adminService.CreateMedine(this.CreateMedicneInPharmacy.value);
  }
  
 

   Cancel(){
    console.log('consal');
   }

   pDataMedcine:any;

   openUpdateDailog(obj:any){
    debugger;
    this.pData=obj;

    this.UpdateMedicne.controls['medicineid'].setValue(this.pData.medicineid);
    this.UpdateMedicne.controls['phmedid'].setValue(this.pData.phmedid);
    this.UpdateMedicne.controls['pharmacyid'].setValue(this.itemId);
    this.adminService.display_image=this.pData.imagename;

  //  this.UpdateMedicne.controls['imagename'].setValue(this.adminService.display_image);
    debugger;
    console.log(this.pData);
    this.dialog.open(this.updateMedicine)
   }
   updated(){
    debugger;
    console.log(this.pData);
      this.adminService.updateMedicine(this.UpdateMedicne.value);
   }
   upleadImage(file:any){
    if(file.length==0)return;
    let fileToUpload=<File> file[0];
    const formData=new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.adminService.uploadAttachment(formData)
   }


}
