import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServicesService } from '../Services/admin-services.service';
import { PaymentService } from '../Services/payment.service';
import { AuthService } from '../Services/auth.service';

declare var paypal: any; // Declare PayPal variable

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItems: any[] = [];
  order: any;
  user:any;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(private router: Router, public adminService: AdminServicesService, public payment: PaymentService,private auth:AuthService) { }
  async ngOnInit() {
    debugger;
    this.order =  await this.payment.GetAllInformationOrder();
    this.user = this.auth.getCurrentUser();

    await this.renderPaypalButtons();

  }
  renderPaypalButtons() {

    paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.order.orderprice.toString(),
              currency_code: 'USD'
            }
          }]
        });
      },
      
      onApprove: async (data: any, actions: any) => {
        return actions.order.capture().then(async (details: any) => {
          console.log('Payment completed:', details);

          if (details.status === 'COMPLETED') {
            this.payment.transactionID = await details.id;
            console.log('Transaction ID:', this.payment.transactionID);

             await this.SendInvoice();
             await this.adminService.AcceptPayment({orderid:this.order.orderid,status:"Paid"})
            this.router.navigate(['confirm']);
          }
        });


      },
      onCancel: (data: any) => {
        // Handle cancelled payment
        console.log('Payment cancelled:', data);
         this.adminService.AcceptPayment({orderid:this.order.orderid,status:"Waiting for payment"})

        this.router.navigate(['cancelled']);
      }
    }).render(this.paymentRef.nativeElement);
  }

  async SendInvoice() {

    const order = {
      orderprice: this.order.orderprice,
      userid: this.user.userid
    };
    const emailDto = { to: this.user.email, subject: "Payment Successfully Processed", plaintext:`Dear ${this.user.name}, <br> <br> Your payment has been successfully sent.<br><br> Thank you for your purchase!`}
    const InvoiceDto = {  orderdate:this.order.orderdate, orderid: this.order.orderid, orderprice: this.order.orderprice, username: this.user.name, email: this.user.email };

    await this.payment.SendInvoice(emailDto, this.cartItems, InvoiceDto);



  }
  cancel() {
    this.router.navigate(['userdashboard/userOrders']);
  }
}
