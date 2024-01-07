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
  CreateOrder(order: any): Promise<any> {
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

}
