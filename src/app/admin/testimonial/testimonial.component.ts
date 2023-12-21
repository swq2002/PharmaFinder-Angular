import { Component } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {

    
  constructor(public adminService:AdminServicesService){
    console.log(adminService.str);
      }
      ngOnInit(): void {
        this.adminService.GetAllTestimonial();
      }

}
