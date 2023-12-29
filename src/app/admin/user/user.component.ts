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
        password:new FormControl('',[Validators.required,Validators.minLength(8)]),
        confirmPassword:new FormControl(),
        email:new FormControl('',[Validators.required,Validators.email]),
        gender:new FormControl('',Validators.required),
        dateofbirth:new FormControl('',Validators.required),
        address:new FormControl('',Validators.required),
        phonenumber:new FormControl('',Validators.required)
       })
    
       OpenCreatedDialog (){
        this.CreateAdminUser.controls['roleid'].setValue(1);
          const dialogRef=this.dialog.open(this.createUser);
       }
       Create(){
        debugger;
        this.adminService.CreateAdminAccount(this.CreateAdminUser.value);
       }
       Cancel(){
        console.log('consal');
       }

       pData:any;

       repeatpasswordError(){
        if(this.CreateAdminUser.controls['password'].value==this.CreateAdminUser.controls['confirmPassword'].value)
       {
        this.CreateAdminUser.controls['confirmPassword'].setErrors(null);
       }
       else{
        this.CreateAdminUser.controls['confirmPassword'].setErrors({misMatch:true});
       }

       }

}
