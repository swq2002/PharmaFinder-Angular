import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import { PaymentService } from 'src/app/Services/payment.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit{
  obj = {
    approval: 'IP', 
  };

  constructor(private payment:PaymentService,public home:HomeService, private router:Router){}
  ngOnInit(): void {
    this.home.GetAllInformationOrders();

}

async Pay(orderid: number): Promise<void> {
  debugger;
  try {
    await this.payment.setOrderId(orderid); 

     this.router.navigate(['payment']);
  } catch (error) {
    console.error('Error occurred during payment:', error);
  }
}


}