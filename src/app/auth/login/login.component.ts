import { Component } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
//
  loginObj: any = {
    username: '',
    password: ''
  };
  rememberMe: boolean = false;
  users: any = []
//
  constructor(public home:HomeService, private auth: AuthService) {
    //
    const usersFromLocalStorage = localStorage.getItem('users');
    const savedUsers = usersFromLocalStorage ? JSON.parse(usersFromLocalStorage) : [];

    if (savedUsers.length > 0) {
      const lastUser = savedUsers[savedUsers.length - 1];
      this.loginObj.username = lastUser.username || '';
    }
    //
  }

  username: FormControl = new FormControl('',Validators.required);
  password: FormControl = new FormControl('',Validators.required);
    

    Login() {
      if (this.rememberMe) {
        this.users = JSON.parse(localStorage.getItem("users")!) || [];
        this.users.push(this.loginObj);
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }

    submit(){
      this.auth.login(this.username.value, this.password.value)
    }
  }