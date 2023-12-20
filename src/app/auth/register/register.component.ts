import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // 
  registerForm : FormGroup = new FormGroup({
    firstName : new FormControl('firstname', Validators.required), 
    lastName : new FormControl('lastname', Validators.required), 
    email : new FormControl('ex@example.com', [Validators.required, Validators.email]), 
    password :new FormControl('********', [Validators.required, Validators.minLength(8)]), //1-8
    confirmPassword:new FormControl('********')//null
  })
  
// constructor() {
// }
// user_New:any =[]
// Register(){

//   this.user_New = JSON.parse(localStorage.getItem("users")!) || [];
//   this.user_New.push(this.regObj);
//  localStorage.setItem('users', JSON.stringify(this.user_New));
// }
register(){
  console.log(this.registerForm.value);
  }
  MatchError(){
    if(this.registerForm.controls['password'].value==
    this.registerForm.controls['confirmPassword'].value)
    this.registerForm.controls['confirmPassword'].setErrors(null)
    else
  
    this.registerForm.controls['confirmPassword'].setErrors({misMatch:true})
  
  
  }
}
