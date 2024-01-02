import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

 
  cartItems: any;
  cartTotalPrice:number=0;
  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.cartTotalPrice = this.cartItems.reduce((total:number, item:any) => {
      return total + (item.medicineprice * item.quantity);
    }, 0); 
  }
  toggleCart(event: Event) {
    event.preventDefault();
    const target = this.el.nativeElement.querySelector('.ltn__utilize');
    this.renderer.addClass(document.body, 'ltn__utilize-open');
    this.renderer.addClass(target, 'ltn__utilize-open');
  }

  closeCart(event: Event) {
    event.preventDefault();
    const target = this.el.nativeElement.querySelector('.ltn__utilize');
    this.renderer.removeClass(document.body, 'ltn__utilize-open');
    this.renderer.removeClass(target, 'ltn__utilize-open');
  }
  deleteCartItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

}
