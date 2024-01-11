import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminPharmacyService } from 'src/app/Services/admin-pharmacy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public adminService:AdminPharmacyService,public dialog: MatDialog){}

  ngOnInit(): void {
    // Remove the following line, as it doesn't do anything useful
    // this.adminService.SalesPharmacy(id);
    // this.adminService.GetPharmacyCount();

  }




}
