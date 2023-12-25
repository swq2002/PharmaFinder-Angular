import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AdminModule } from '../admin.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  numberOfMedicine: number;
  
constructor(public adminService:AdminServicesService){
  this.numberOfMedicine = adminService.numberOfMedicine;
  console.log(this.numberOfMedicine);
}

ngOnInit(): void {

  this.adminService.GetAllMedicine();
  console.log(this.numberOfMedicine);
}




}
