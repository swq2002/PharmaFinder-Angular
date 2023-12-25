import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

@ViewChild  ('callDeleteDailog') callDelete!:TemplateRef<any>    
  constructor(public adminService:AdminServicesService, public dialog: MatDialog){
    console.log(adminService.str);
      }
      ngOnInit(): void {
        this.adminService.GetAllContactUs();
      }
      DeleteContact(id:number){

          const dialogRef =this.dialog.open(this.callDelete)
       
          dialogRef.afterClosed().subscribe((result)=>
          {
            if(result=='yes')
            this.adminService.DeleteContactUsByID(id)
          else {
            console.log('close');
          }

          })
        }
       



}
