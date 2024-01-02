import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any;
  cartTotalPrice:number=0;

  ngOnInit(): void {
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
    this.cartTotalPrice = this.cartItems.reduce((total:number, item:any) => {
      return total + (item.medicineprice * item.quantity);
    }, 0); 
  }
}
