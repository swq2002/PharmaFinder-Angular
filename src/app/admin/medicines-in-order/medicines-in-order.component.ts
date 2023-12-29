import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-medicines-in-order',
  templateUrl: './medicines-in-order.component.html',
  styleUrls: ['./medicines-in-order.component.css']
})
export class MedicinesInOrderComponent implements OnInit{
  constructor(public adminService:AdminServicesService){}
  ngOnInit(): void {
    debugger;
     this.adminService.medicineInOrder(this.adminService.idNumber);
  }





}
