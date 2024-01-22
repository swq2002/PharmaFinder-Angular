import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
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
         
        const dialogRef=this.dialog.open(this.callDelete);
        dialogRef.afterClosed().subscribe((res)=>{
           
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
        profileimage:new FormControl(),
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
       upleadImage(file:any){
        if(file.length==0)return;
        let fileToUpload=<File> file[0];
        const formData=new FormData();
         
        formData.append('file',fileToUpload,fileToUpload.name);
         
        this.adminService.uploadAttachmentUser(formData)
       }




}