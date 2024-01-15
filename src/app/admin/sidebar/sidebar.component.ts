import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private http: HttpClient, public router: Router) { }

  goToLogin(){
    this.router.navigate(['security/login']);
  }

  logout(){
    localStorage.clear();
    this.goToLogin();
    }
}
