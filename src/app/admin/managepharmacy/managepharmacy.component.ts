import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-managepharmacy',
  templateUrl: './managepharmacy.component.html',
  styleUrls: ['./managepharmacy.component.css']
})
export class ManagepharmacyComponent implements OnInit {
@ViewChild ('callDeleteDailog') callDelete!:TemplateRef<any>
  constructor(public adminService:AdminServicesService,public dialog: MatDialog){
console.log(adminService.str);
  }
  ngOnInit(): void {
    this.adminService.GetAllPharmacy();
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
      CreaatePharmacy(body:any){
      }

}
