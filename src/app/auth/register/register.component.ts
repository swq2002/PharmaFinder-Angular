import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  regObj:any ={
    firstname:'',
    lastname:'',
    email:'',
    password:''
  }
  
constructor() {
 
}

user_New:any =[]


Register(){

  this.user_New = JSON.parse(localStorage.getItem("users")!) || [];
  this.user_New.push(this.regObj);
 localStorage.setItem('users', JSON.stringify(this.user_New));



}
}
