import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginObj: any = {
    userName: '',
    password: ''

  };
  rememberMe: boolean = false;
  users: any = []


  constructor() {
    const usersFromLocalStorage = localStorage.getItem('users');
    const savedUsers = usersFromLocalStorage ? JSON.parse(usersFromLocalStorage) : [];

    if (savedUsers.length > 0) {
      const lastUser = savedUsers[savedUsers.length - 1];
      this.loginObj.userName = lastUser.userName || '';
      this.loginObj.password = lastUser.password || '';
    }
  }
    Login() {

      if (this.rememberMe) {
        this.users = JSON.parse(localStorage.getItem("users")!) || [];
        this.users.push(this.loginObj);
        localStorage.setItem('users', JSON.stringify(this.users));


      }
    }
  }
