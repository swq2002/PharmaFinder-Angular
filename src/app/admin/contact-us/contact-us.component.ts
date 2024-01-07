import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
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
export class ContactUsComponent {

@ViewChild  ('callDeleteDailog') callDelete!:TemplateRef<any> 
@ViewChild  ('ReplayEmaill') replayEmail!:TemplateRef<any>    
  constructor(public adminService:AdminServicesService, public dialog: MatDialog){
    console.log(adminService.str);
      }
      ngOnInit(): void {
        this.adminService.GetAllContactUs();
      }
      DeleteContact(id:number){

          const dialogRef =this.dialog.open(this.callDelete,{width:'350px'})
       
          dialogRef.afterClosed().subscribe((result)=>
          {
            if(result=='yes')
            this.adminService.DeleteContactUsByID(id)
          else {
            console.log('close');
          }

          })
        }
        emailaddress:any;
        sendEmail:FormGroup=new FormGroup({
          to:new FormControl(),
          subject:new FormControl(),
          plainText:new FormControl('',Validators.required), })

               pData:any;
               ReplayEmail(email:any){
                this.pData=email;
                this.sendEmail.controls['to'].setValue(email);
                const dialogRef=this.dialog.open(this.replayEmail);
               }
               
               sendEmailContact(){
                  debugger;
                    this.adminService.sendEmailContact(this.sendEmail.value);
                  }
               Cancel(){
                console.log('consal');
               }

}