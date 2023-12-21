import { Component } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent {
  
  
   
  constructor(public adminService:AdminServicesService){
    console.log(adminService.str);
      }
      ngOnInit(): void {
        this.adminService.GetAllMedicine();
      }



}
