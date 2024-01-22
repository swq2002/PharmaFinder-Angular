import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AcceptComponent } from '../accept/accept.component';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
  styles: [`
  table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    th {
      background-color: #f2f2f2;
    }

  h2 {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

`]
})
export class TestimonialComponent implements OnInit {
  @ViewChild('callDeleteDailog') callDelete!: TemplateRef<any>
  @ViewChild('AcceptDailog') OpenDailog!: TemplateRef<any>

  constructor(public adminService: AdminServicesService, public dialog: MatDialog) {
    console.log(adminService.str);
  }

  ngOnInit(): void {
    this.adminService.GetAllTestimonial();
  }

  AcceptTestimonial: FormGroup = new FormGroup({
    utestimonialid: new FormControl(),
    userid: new FormControl(),
    testimonialdate: new FormControl(),
    testimonialtext: new FormControl(),
    status: new FormControl(),
  })

  pData: any;

  Accept(obj: any) {
     
    this.pData = obj;
    this.AcceptTestimonial.controls['utestimonialid'].setValue(this.pData.utestimonialid);

    this.AcceptTestimonial.controls['status'].setValue("Accepted");

    const dialogRef = this.dialog.open(this.OpenDailog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
         
        this.adminService.AcceptTestimonial(this.AcceptTestimonial.value);
      } else {
         
        console.log('cancel');
      }
    });
  }

  Reject(obj: any) {
     
    this.pData = obj;
    this.AcceptTestimonial.controls['utestimonialid'].setValue(this.pData.utestimonialid);

    this.AcceptTestimonial.controls['status'].setValue("Rejected");

    const dialogRef = this.dialog.open(this.OpenDailog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
         
        this.adminService.RejectTestimonial(this.AcceptTestimonial.value);
      } else {
         
        console.log('cancel');
      }
    });
  }


}











