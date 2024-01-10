import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/Services/home.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit{
  obj = {
    approval: 'IP', 
  };

  constructor(public home:HomeService){}
  ngOnInit(): void {
    this.home.GetAllInformationOrders();

}
}