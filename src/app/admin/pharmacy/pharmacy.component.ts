import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
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
export class PharmacyComponent implements OnInit {
  @ViewChild ('callDeletesDailog') callDelete!:TemplateRef<any>
@ViewChild('createPharmacDailog') createPharmacDailog!:TemplateRef<any>
@ViewChild('up') updatePharmacDailog!:TemplateRef<any>
pharmacyName:string='';


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
        pharmacyname:new FormControl('',Validators.required),
        location:new FormControl('',Validators.required),
        address:new FormControl('',Validators.required),
        lng:new FormControl('',Validators.required),
        lat:new FormControl('',Validators.required),
        email :new FormControl('',Validators.required),
        phonenumber :new FormControl('',Validators.required)     
      })
      updatePharmacy:FormGroup=new FormGroup({
        pharmacyid:new FormControl('',Validators.required),
        pharmacyname:new FormControl('',Validators.required),
        location:new FormControl('',Validators.required),
        address:new FormControl('',Validators.required),
        lng:new FormControl('',Validators.required),
        lat:new FormControl('',Validators.required),
        email :new FormControl('',Validators.required),
        phonenumber :new FormControl('',Validators.required)     
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

        this.updatePharmacy.controls['pharmacyid'].setValue(this.pData.pharmacyid);
        console.log(this.pData);
        const dialogRef=this.dialog.open(this.updatePharmacDailog)
       }
       pData:any;
       update(){
        debugger;

          this.adminService.updatePharmacy(this.updatePharmacy.value);
       }



}