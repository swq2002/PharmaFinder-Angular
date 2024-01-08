import { Component } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { authorizationGuard } from 'src/app/authorization.guard';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent {
  constructor(public home:HomeService){}
  ngOnInit(): void {
    this.home.GetAllInformationOrders();
  }
}
