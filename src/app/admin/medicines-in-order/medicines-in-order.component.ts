import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-medicines-in-order',
  templateUrl: './medicines-in-order.component.html',
  styleUrls: ['./medicines-in-order.component.css']
})
export class MedicinesInOrderComponent {

  constructor(public adminService:AdminServicesService,public route:ActivatedRoute){}
  Id:number=0;
  medinInOrder:any;
  
  async ngOnInit() {
    debugger;
    
     this.route.queryParams.subscribe(params => {this.Id = params['id'] } );
     await this.adminService.MedicineInOrder(this.Id);
     this.medinInOrder=await this.adminService.medicineInOrder;
     
  }
  



}
