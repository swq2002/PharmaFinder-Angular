import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { PaymentService } from '../Services/payment.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems: any;
  cartTotalPrice: number = 0;
  user: any;

  constructor(public home: HomeService, private spinner:NgxSpinnerService,public payment: PaymentService, private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.loadCart();
    this.user = this.auth.getCurrentUser();
  }

  loadCart(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotalPrice();
  }

  increment(item: any): void {
    item.quantity++;
    this.updateCart();
    this.calculateTotalPrice();

  }

  decrement(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
      this.calculateTotalPrice();

    }
  }



  updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  deleteCartItem(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
    this.calculateTotalPrice();

  }
  calculateTotalPrice() {
    this.cartTotalPrice = this.cartItems.reduce((total: number, item: any) => {
      return total + (item.medicineprice * item.quantity);
    }, 0);
  }




  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.cartTotalPrice = 0;
  }
  async SendOrder() {
    debugger;
    this.spinner.show();

    const order = {
      orderprice: this.cartTotalPrice,
      userid: this.user.userid
    };
    const now = new Date();

    const emailDto = { to: this.user.email, subject: "Invoice", plaintext:`Dear ${this.user.name}, <br> Your order has been sent successfully and is under review.` }

    const orderId = await this.payment.CreateOrder(order);
    const InvoiceDto = { orderid: orderId, orderdate:now ,orderprice: this.cartTotalPrice, username: this.user.name, email: this.user.email };

    await this.payment.CreateOrderMed(orderId, this.cartItems);
    await this.payment.SendInvoice(emailDto, this.cartItems, InvoiceDto);


    this.clearCart();
    this.spinner.hide();

    this.router.navigate(['checkout']);

  }

}