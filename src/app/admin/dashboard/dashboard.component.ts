import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AdminModule } from '../admin.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  numberOfMedicine: number = 0;

  constructor(public adminService: AdminServicesService, private http: HttpClient) {}

   numberOfMed() {
    // this.adminService.GetAllMedicine();
    // console.log(this.numberOfMedicine);
    this.NumberOfUsersRegistered();
  }

  numberOfUsersRegistered: any = {};
  
  NumberOfUsersRegistered() {
    debugger;
    this.http.get('https://localhost:7274/api/User/GetUserCount').subscribe(
      (resp) => {
        debugger;
        this.numberOfUsersRegistered = resp; // Assign the value to adminService
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

  ngOnInit(): void {
    this.numberOfMed();
    // Remove the following line, as it doesn't do anything useful
    this.adminService.CalculateTotalOrderPrice();
    this.adminService.GetPharmacyCount();

  }
}
