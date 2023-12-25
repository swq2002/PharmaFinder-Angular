import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AcceptComponent } from '../accept/accept.component';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
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
    debugger;
    this.pData = obj;
    this.AcceptTestimonial.controls['utestimonialid'].setValue(this.pData.utestimonialid);
    this.AcceptTestimonial.controls['userid'].setValue(this.pData.userid);
    this.AcceptTestimonial.controls['testimonialtext'].setValue(this.pData.testimonialtext);
    this.AcceptTestimonial.controls['testimonialdate'].setValue(this.pData.testimonialdate);

    this.AcceptTestimonial.controls['status'].setValue("Accepted");

    const dialogRef = this.dialog.open(this.OpenDailog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        debugger;
        this.adminService.AcceptTestimonial(this.AcceptTestimonial.value);
      } else {
        debugger;
        console.log('cancel');
      }
    });
  }

  Reject(obj: any) {
    debugger;
    this.pData = obj;
    this.AcceptTestimonial.controls['utestimonialid'].setValue(this.pData.utestimonialid);
    this.AcceptTestimonial.controls['userid'].setValue(this.pData.userid);
    this.AcceptTestimonial.controls['testimonialtext'].setValue(this.pData.testimonialtext);
    this.AcceptTestimonial.controls['testimonialdate'].setValue(this.pData.testimonialdate);

    this.AcceptTestimonial.controls['status'].setValue("Rejected");

    const dialogRef = this.dialog.open(this.OpenDailog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        debugger;
        this.adminService.RejectTestimonial(this.AcceptTestimonial.value);
      } else {
        debugger;
        console.log('cancel');
      }
    });
  }


}
