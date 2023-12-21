import { Component } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

    
  constructor(public adminService:AdminServicesService){
    console.log(adminService.str);
      }
      ngOnInit(): void {
        this.adminService.GetAllContactUs();
      }

}
