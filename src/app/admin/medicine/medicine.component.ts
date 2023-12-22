import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent {
  @ViewChild ('callDeleteDailog') callDelete!:TemplateRef<any>
  
   
  constructor(public adminService:AdminServicesService,public dialog: MatDialog){
    console.log(adminService.str);
      }
      ngOnInit(): void {
        this.adminService.GetAllMedicine();
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

}
