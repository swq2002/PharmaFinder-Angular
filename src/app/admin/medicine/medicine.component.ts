import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';


@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit{
  @ViewChild ('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('CreateMedicineDailog') createMedicine!:TemplateRef<any>
  @ViewChild('updateMedicineDailog') updateMedicine!:TemplateRef<any>

   numberOfMedicine:number|undefined;
  constructor(public adminService:AdminServicesService,public dialog: MatDialog){
    console.log(adminService.str);
      }
      ngOnInit(): void {

        this.adminService.GetAllMedicine();
        this.numberOfMedicine;
      }

      DeleteMedicine(id:number){
        debugger;
        const dialogRef=this.dialog.open(this.callDelete);
        dialogRef.afterClosed().subscribe((result)=>{
         if(result=="yes"){
           this.adminService.DeleteMedicineByID(id);
         }
         else{
           console.log('cansele delete');
         }
        })
         
       }
       CreateMedicne:FormGroup=new FormGroup({
        medicinename:new FormControl('',Validators.required),
        medicineprice:new FormControl('',Validators.required),
        medicinetype:new FormControl('',Validators.required),
        medicinedescription:new FormControl('',Validators.required),
        expiredate:new FormControl('',Validators.required),
        activesubstance:new FormControl('',Validators.required)
       })
       
       UpdateMedicne:FormGroup=new FormGroup({
        medicineid:new FormControl('',Validators.required),
        medicinename:new FormControl('',Validators.required),
        medicineprice:new FormControl('',Validators.required),
        medicinetype:new FormControl('',Validators.required),
        medicinedescription:new FormControl('',Validators.required),
        expiredate:new FormControl('',Validators.required),
        activesubstance:new FormControl('',Validators.required)
       })
       OpenCreateDialog (){
          const dialogRef=this.dialog.open(this.createMedicine);
       }
       Create(){
        debugger;
        this.adminService.CreateMedine(this.CreateMedicne.value);
       }
       Cancel(){
        console.log('consal');
       }

       pData:any;

       openUpdateDailog(obj:any){
        debugger;
        this.pData=obj;

        this.UpdateMedicne.controls['medicineid'].setValue(this.pData.medicineid);
        console.log(this.pData);
        this.dialog.open(this.updateMedicine)
       }
       updated(){
        debugger;
        console.log(this.pData);
          this.adminService.updateMedicine(this.UpdateMedicne.value);
       }

}
