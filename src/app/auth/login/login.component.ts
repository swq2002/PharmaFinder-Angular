import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

loginError: boolean = false;
  loginObj: any = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false;
  users: any = []
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(public home:HomeService, private auth: AuthService, private router: Router, public toastr: ToastrService,    private socialAuthService: SocialAuthService) {

    const usersFromLocalStorage = localStorage.getItem('users');
    const savedUsers = usersFromLocalStorage ? JSON.parse(usersFromLocalStorage) : [];

    if (savedUsers.length > 0) {
      const lastUser = savedUsers[savedUsers.length - 1];
      this.loginObj.email = lastUser.email || '';
    }
  }
  
  
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.users = user;
      this.isLoggedin = (user != null);
      const token = user.idToken;
      localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(user));
      console.log(this.users)
      // let data: any = jwtDecode(token);
      // localStorage.setItem('user', JSON.stringify(data))
      this.auth.CreateUserGmail(user)

    })
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