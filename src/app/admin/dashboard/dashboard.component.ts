import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AdminModule } from '../admin.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  numberOfMedicine: number=0;
  
constructor(public adminService:AdminServicesService){
 
}
async numberOfMed(){

  this.adminService.GetAllMedicine();
  console.log(this.numberOfMedicine);
   this.numberOfMedicine = await this.adminService.numberOfMedicine;

}
 ngOnInit(): void {
this.numberOfMed();
}

}
