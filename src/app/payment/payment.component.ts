// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { AdminServicesService } from '../Services/admin-services.service';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })
// export class PaymentComponent implements OnInit {
//   amount = 0;
//   @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
//   constructor(private router: Router, public adminService: AdminServicesService) { }
//   ngOnInit(): void {
//     this.amount = this.adminService.salesOfOrder;
//     window.paypal.Buttons(
//       {
//         style: {
//           layout: 'horizontal',
//           color: 'blue',
//           shape: 'rect',
//           label: 'paypal',
//         }
//       },

//       createOrder: (data:any, actions: any) => {

//       }

//     ).render(this.paymentRef.nativeElement);

//   }


//   cancel() {
//     this.router.navigate(['cart'])
//   }
// }


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServicesService } from '../Services/admin-services.service';
import { PaymentService } from '../Services/payment.service';

declare var paypal: any; // Declare PayPal variable

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  amount = 0;
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(private router: Router, public adminService: AdminServicesService, public payment:PaymentService) { }

  ngOnInit(): void {

     const storedAmount = localStorage.getItem('cartTotalPrice');
    if (storedAmount) {
      this.amount = parseFloat(storedAmount); // Parse the amount as a float or integer based on your scenario
    } else {
      // Set default amount or handle the scenario where amount isn't stored
      this.amount = 0;
    }

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
              value: this.amount.toString(),
              currency_code: 'USD'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          // Handle successful payment
          console.log('Payment completed:', details);
          
          // Redirect or perform actions after successful payment
          if (details.status === 'COMPLETED') {
            this.payment.transactionID = details.id; // Accessing transaction ID from PayPal response
            console.log('Transaction ID:', this.payment.transactionID );
            // Use the transactionID as needed

            // Redirect after successful payment
            this.router.navigate(['confirm']);
          }
        });


      },
      onCancel: (data: any) => {
        // Handle cancelled payment
        console.log('Payment cancelled:', data);
        // Redirect or perform actions after cancelled payment
        // Example: this.router.navigate(['cancelled']);
      }
    }).render(this.paymentRef.nativeElement);
  }

  cancel() {
    this.router.navigate(['cart']);
  }
}
