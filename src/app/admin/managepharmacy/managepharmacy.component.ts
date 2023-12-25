import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-managepharmacy',
  templateUrl: './managepharmacy.component.html',
  styleUrls: ['./managepharmacy.component.css']
})
export class ManagepharmacyComponent implements OnInit {
@ViewChild ('callDeleteDailog') callDelete!:TemplateRef<any>
@ViewChild('CreatePharmacDailog') createPharmacDailog!:TemplateRef<any>
@ViewChild('updatePharmacDailog') updatePharmacDailog!:TemplateRef<any>
numberOfPharmac:number|undefined
constructor(public adminService:AdminServicesService,public dialog: MatDialog){
console.log(adminService.str);
  }
  ngOnInit(): void {
    this.adminService.GetAllPharmacy();
    this.numberOfPharmac;
  }

  DeletePharmcy(id:number){
   debugger;
   const dialogRef=this.dialog.open(this.callDelete);
   dialogRef.afterClosed().subscribe((result)=>{
    if(result=="yes"){
      this.adminService.DeletePharmacyByID(id);
    }
    else{
      console.log('consele delete');
    }
   })
      }


      CreatePharmacy:FormGroup=new FormGroup({
        Pharmacy_Name:new FormControl('',Validators.required),
        Location_:new FormControl('',Validators.required),
        Address_:new FormControl('',Validators.required),
        Lng_:new FormControl('',Validators.required),
        Lat_:new FormControl('',Validators.required),
        Email_ :new FormControl('',Validators.required),
        Phone_Number :new FormControl('',Validators.required)     
      })
      UpdatePharmacy:FormGroup=new FormGroup({
        Pharmacy_ID:new FormControl('',Validators.required),
        Pharmacy_Name:new FormControl('',Validators.required),
        Location_:new FormControl('',Validators.required),
        Address_:new FormControl('',Validators.required),
        Medicine_Description:new FormControl('',Validators.required),
        Lng_:new FormControl('',Validators.required),
        Lat_:new FormControl('',Validators.required),
        Email_ :new FormControl('',Validators.required),
        Phone_Number :new FormControl('',Validators.required)     
      })
      OpenCreateDialog (){
        const dialogRef=this.dialog.open(this.createPharmacDailog);
     }
     CreatePharm(){
        debugger;
        this.adminService.CreatedPharmicy(this.CreatePharmacy.value);
       }
       Cancel(){
        console.log('consal');
       }


          
       openUpdateDailog(obj:any){
        debugger;
        this.pData=obj;

        this.UpdatePharmacy.controls['medicineid'].setValue(this.pData.medicineid);
        console.log(this.pData);
        const dialogRef=this.dialog.open(this.updatePharmacDailog)
       }
       pData:any;
       update(){
        debugger;

        const medicineId = this.UpdatePharmacy.value.medicineid;
          this.adminService.updateMedicine(this.UpdatePharmacy.value);
       }
}
