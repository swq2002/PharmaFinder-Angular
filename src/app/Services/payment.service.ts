import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  transactionID = "";
   orderId:number=0;
  constructor(private http: HttpClient,private toaster:ToastrService,private spinner:NgxSpinnerService) { 
  }
  private orderIdPay: number=0;

  setOrderId(orderId: number) {
    this.orderIdPay = orderId;
  }
 

  getOrderId(): number {
    return this.orderIdPay;
  }
  CreateOrder(order: any): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post('https://localhost:7274/api/Orders/CreateOrder', order).subscribe(
        (resp: any) => {
          const orderId = parseInt(resp.toString());
          resolve(orderId);
        },
        err => {
          console.error(err);
          reject(err);
        }
      );
    });
  }

  CreateOrderMed(orderId: number, items: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`https://localhost:7274/api/OrderMed/CreateOrderMed/${orderId}`, items).subscribe(
        (respOrderMed: any) => {
          resolve(respOrderMed);
        },
        errOrderMed => {
          console.error(errOrderMed);
          reject(errOrderMed);
        }
      );
    });


}
SendInvoice(emailDto: any, items: any,InvoiceDto:any): Promise<any> {
  return new Promise((resolve, reject) => {
const data={
  emailDto:emailDto,
  items:items,
  invoiceDto:InvoiceDto

}

    this.http.post(`https://localhost:7274/api/Email/SendInvoice`, data).subscribe(
      (respOrderMed: any) => {
        resolve(respOrderMed);
      },
      errOrderMed => {
        console.error(errOrderMed);
        reject(errOrderMed);
      }
    );
  });

  
}
GetAllInformationOrder(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(`https://localhost:7274/api/Orders/GetOrderById/${this.orderIdPay}`).subscribe(
      (resp) => {
        resolve(resp); 
      },
      (err) => {
        console.error(err.message);
        console.error(err.status);
        reject(err); 
      }
    );
  });
}
}
