import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../Services/payment.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  transcationid = "";

  constructor(private payment:PaymentService){}
  async ngOnInit() {
    this.transcationid = await this.payment.transactionID
  }

}
