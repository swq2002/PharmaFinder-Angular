import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-managepharmacy',
  templateUrl: './managepharmacy.component.html',
  styleUrls: ['./managepharmacy.component.css']
})
export class ManagepharmacyComponent implements OnInit {

  constructor(public adminService:AdminServicesService){
console.log(adminService.str);
  }
  ngOnInit(): void {
    this.adminService.GetAllPharmacy();
  }
}
