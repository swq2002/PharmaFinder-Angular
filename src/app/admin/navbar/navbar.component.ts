import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userdata: any;
  token:any;
  router: any;
  constructor(public adminService: AdminServicesService, private http: HttpClient, public auth:AuthService) { }
  ngOnInit(): void {

    this.token = this.auth.getCurrentUser();
   
    this.adminService.getUserbyId(this.token.userid).subscribe(
      (data: any) => {
        this.userdata = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

 goToLogin(){
    this.router.navigate(['']);
  }
 
  logout(){
    localStorage.clear();
    this.goToLogin();
    }
}
