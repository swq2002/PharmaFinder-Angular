import { Component } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

loginError: boolean = false;
  loginObj: any = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false;
  users: any = []

  constructor(public home:HomeService, private auth: AuthService, private router: Router, public toastr: ToastrService) {

    const usersFromLocalStorage = localStorage.getItem('users');
    const savedUsers = usersFromLocalStorage ? JSON.parse(usersFromLocalStorage) : [];

    if (savedUsers.length > 0) {
      const lastUser = savedUsers[savedUsers.length - 1];
      this.loginObj.email = lastUser.email || '';
    }
  }
  loginError$ = this.auth.loginError$; 

  email: FormControl = new FormControl('',Validators.required);
  password: FormControl = new FormControl('',Validators.required);
    

    Login() {
      if (this.rememberMe) {
        this.users = JSON.parse(localStorage.getItem("users")!) || [];
        this.users.push(this.loginObj);
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }

    submit() {
       
      if (this.email.valid && this.password.valid) {
        this.auth.login(this.email.value, this.password.value);
       
      }
      else{
        this.loginError=true;
      }
    }
  }