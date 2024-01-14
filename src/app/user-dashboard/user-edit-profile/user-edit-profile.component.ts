import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AuthService } from 'src/app/Services/auth.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css']
})
export class UserEditProfileComponent implements OnInit {
  @ViewChild('callDeleteDailog') callDelete!: TemplateRef<any>
  userdata: any;
  token:any;
  constructor(
    public admin: AdminServicesService,
    public dialog: MatDialog,
    public home: HomeService,
    public auth:AuthService,
    private router: Router,
    public toster:ToastrService
  ) {}
  @ViewChild('callUserUpdateDailog') callUserUpdateDailog!: TemplateRef<any>;
  ngOnInit(): void {

    this.token = this.auth.getCurrentUser();
   
    this.admin.getUserbyId(this.token.userid).subscribe(
      (data: any) => {
        this.userdata = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  updateUserForm: FormGroup = new FormGroup({
    userid: new FormControl(),
    roleid: new FormControl(),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phonenumber: new FormControl(''),
    address: new FormControl(''),
    profileimage: new FormControl(''),
    registrationdate: new FormControl(''),
    dateofbirth: new FormControl(''),
    gender: new FormControl(''),
  });

  previousData: any = {};

  openUpdateUserDailog(user: any) {
    this.previousData = {
      userid: user.userid,
      roleid: user.roleid,
      username: user.username,
      email: user.email,
      password: user.password,
      phonenumber: user.phonenumber,
      address: user.address,
      profileimage: user.profileimage,
      registrationdate: user.registrationdate,
      dateofbirth: user.dateofbirth,
      gender: user.gender,
    };
    console.log(this.previousData);
    this.updateUserForm.controls['userid'].setValue(this.previousData.userid);
    this.updateUserForm.controls['roleid'].setValue(this.previousData.roleid);
    this.updateUserForm.controls['registrationdate'].setValue(
      this.previousData.registrationdate
    );
    this.updateUserForm.controls['dateofbirth'].setValue(
      this.previousData.dateofbirth
    );
    this.updateUserForm.controls['gender'].setValue(this.previousData.gender);
    this.dialog.open(this.callUserUpdateDailog);
  }
  updateUser() {
    this.admin.updateUser(this.updateUserForm.value);
  }

  UploadImage(file:any) {
    if(file.length==0)
     return ; 
     let fileToUpload=<File>file[0];
     const formDate=new FormData();
      formDate.append('file',fileToUpload,fileToUpload.name);
      this.admin.uploadImageUserAttachment(formDate);
  }

  deleteUser(id: number){
    //const user = this.auth.getCurrentUser();
    debugger
    const dialogRef = this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        this.admin.DeleteUserAccountByID(id);
        this.toster.success('Your account has been successfully deleted')
        this.router.navigate(['security/register']);
      }
      else {
        console.log('error');
      }
    })

  }

  goToLogin(){
    this.router.navigate(['security/login']);
  }
  
  logout(){
    localStorage.clear();
    this.goToLogin();
    }
}