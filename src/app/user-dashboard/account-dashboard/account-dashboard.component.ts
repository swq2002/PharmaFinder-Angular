import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent {
  constructor(public home:HomeService, private router: Router){}
  ngOnInit(): void {
    this.home.GetAllInformationOrders();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['security/login']);
  }
}
