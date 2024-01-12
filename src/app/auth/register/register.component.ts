import { Component, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/Services/home.service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerForm : FormGroup = new FormGroup({
    userName : new FormControl('User Name', Validators.required), 
    email : new FormControl('ex@example.com', [Validators.required, Validators.email]), 
    password :new FormControl('********', [Validators.required, Validators.minLength(8)]), //1-8
    confirmPassword:new FormControl('********',Validators.required),
    dateOfBirth:new FormControl(''),
    phoneNumber: new FormControl('0123457890',[Validators.required,Validators.pattern(/^[0-9]{10,10}$/)]),
    phoneNumber1: new FormControl('',Validators.pattern(/^[6-9]\d{9}$/)),
    gender: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    Profileimage: new FormControl(),
    roleId: new FormControl(2)
 
  });

  regObj:any ={
    username:'User Name',
    email:'ex@example.com',
    password:'********'
  }


constructor(public home:HomeService ,private fb: FormBuilder, private http: HttpClient, private el: ElementRef,
   private renderer: Renderer2, private router:Router, private toastr: ToastrService,private spinner:NgxSpinnerService) {
}

goToLogin(){
    this.router.navigate(['security/login']);
  }



  MatchError(){
    if(this.registerForm.controls['password'].value==
    this.registerForm.controls['confirmPassword'].value)
    this.registerForm.controls['confirmPassword'].setErrors(null)
    else
  
    this.registerForm.controls['confirmPassword'].setErrors({misMatch:true})
  }
  clearInput(controlName: string): void {
    this.registerForm.get(controlName)?.setValue('');
  }

  Register() {
    const registrationData = {
      userName: this.regObj.username,
      email: this.regObj.email,
      password: this.regObj.password,
    confirmPassword: this.regObj.confirmPassword,
    birthDate: this.regObj.birthDate,
    phoneNumber: this.regObj.phoneNumber,
    gender: this.regObj.gender,
    address: this.regObj.adderss,
    Profileimage: this.regObj.Profileimage,
    roleid: 2
  };
 
}


async Submit() {
  debugger;
  this.spinner.show();
  const userEmail = this.registerForm.controls['email'].value;
 
  if (this.registerForm.invalid) {
    this.toastr.error('Please fill in all required fields', 'Error');
    return;
  }
 
  await this.home.isEmailAlreadyRegistered(userEmail).subscribe(isRegistered => {
    debugger
    if (isRegistered) {
      this.notifyUser();
      this.goToLogin();
    } else {
      this.spinner.show();
      this.home.createUser(this.registerForm.value).subscribe(
        resp => {
          console.log('User created successfully!', resp);
          this.toastr.success('Your account created successfully!');
          this.spinner.hide();
          this.goToLogin();
        },
        error => {
          this.toastr.error('Fill the form please')
          console.error('Error creating user:', error);
        }
      );
    }
  });

}
 
private notifyUser() {
  this.toastr.error('You already have account')
  console.log('You already have an account!');
}




UploadImage(file:any){
  debugger;
  if(file.length==0) return;
  let fileToUpload=<File> file[0];
  const formData = new FormData();
  formData.append('file',fileToUpload,fileToUpload.name);
  this.home.uploadAttachment(formData);
}

}
