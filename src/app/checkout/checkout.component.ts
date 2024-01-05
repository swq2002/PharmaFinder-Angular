import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  cartTotalPrice: number = 0;

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.cartTotalPrice = this.cartItems.reduce((total: number, item: any) => {
      return total + item.medicineprice * item.quantity;
    }, 0);
  
    localStorage.setItem('OrderTotal', this.cartTotalPrice.toString());
  }


  placeOrder(): void {
    this.clearCart();
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.cartTotalPrice = 0;
  }


// addOrder(){
//   https://localhost:7274/api/Orders/CreateOrder

// }
}
