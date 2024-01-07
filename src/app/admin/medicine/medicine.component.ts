import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';


@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
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
export class MedicineComponent implements OnInit{
  @ViewChild ('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('CreateMedicineDailog') createMedicine!:TemplateRef<any>
  @ViewChild('updateMedicineDailog') updateMedicine!:TemplateRef<any>
filterMedicineName:string='';
   numberOfMedicine:number|undefined;
  constructor(public adminService:AdminServicesService,public dialog: MatDialog){
    console.log(adminService.str);
      }
      ngOnInit(): void {
        debugger;
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
        imagename:new FormControl(),
        medicinetype:new FormControl('',Validators.required),
        medicinedescription:new FormControl('',Validators.required),
        expiredate:new FormControl('',Validators.required),
        activesubstance:new FormControl('',Validators.required)
       })
       
       UpdateMedicne:FormGroup=new FormGroup({
        medicineid:new FormControl(),
        medicinename:new FormControl('',Validators.required),
        medicineprice:new FormControl('',Validators.required),
        medicinetype:new FormControl('',Validators.required),
        medicinedescription:new FormControl('',Validators.required),
        expiredate:new FormControl('',Validators.required),
        imagename:new FormControl('',Validators.required),
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
        this.adminService.display_image=this.pData.imagename
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