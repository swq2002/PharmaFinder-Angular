import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {
  @ViewChild ('callDeleteDailog') callDelete!:TemplateRef<any>
    
  constructor(public adminService:AdminServicesService,public dialog: MatDialog){
    console.log(adminService.str);
      }
      ngOnInit(): void {
        this.adminService.GetAllTestimonial();
      }
}
