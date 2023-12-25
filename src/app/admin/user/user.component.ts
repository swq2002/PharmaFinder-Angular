import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit{
  @ViewChild ('callDeletesDailog') callDelete!:TemplateRef<any>
  @ViewChild('CreateUserAccountDailog') createUser!:TemplateRef<any>

  constructor(public adminService:AdminServicesService,public dialog: MatDialog){
    console.log(adminService.str);
      }
      ngOnInit(): void {

        this.adminService.GetAllUserAccount();
      }

      DeleteUser(id:number){
        debugger;
        const dialogRef=this.dialog.open(this.callDelete);
        dialogRef.afterClosed().subscribe((res)=>{
          debugger;
          if(res=="yes"){
            this.adminService.DeleteUserAccountByID(id);
          }
          else{
            console.log('cansele delete');
          }
        })
       }
       CreateAdminUser:FormGroup=new FormGroup({
        roleid:new FormControl('',Validators.required),
        profileimage:new FormControl('',Validators.required),
        username:new FormControl('',Validators.required),
        password:new FormControl('',Validators.required),
        email:new FormControl('',Validators.required),
        registrationdate:new FormControl('',Validators.required),
        gender:new FormControl('',Validators.required),
        dateofbirth:new FormControl('',Validators.required),
        address:new FormControl('',Validators.required),
        phonenumber:new FormControl('',Validators.required)
       })
    
       OpenCreatedDialog (){
          const dialogRef=this.dialog.open(this.createUser);
       }
       Create(){
        debugger;
        this.adminService.CreateUserAccount(this.CreateAdminUser.value);
       }
       Cancel(){
        console.log('consal');
       }

       pData:any;

       

}
