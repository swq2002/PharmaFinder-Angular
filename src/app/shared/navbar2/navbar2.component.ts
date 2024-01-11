import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {
  user: any;
  constructor(private renderer: Renderer2, private el: ElementRef,private home:HomeService,private router:Router,private auth:AuthService) {}

 
  cartItems: any;
  cartTotalPrice:number=0;
 async ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotalPrice();
    this.user= await this.auth.getCurrentUser();
    console.log('User:', this.user);
  }
  async scrollToSection(sectionId: string) {
    await this.router.navigate(['']).then(() => {
       this.home.scrollToSection(sectionId);
    });
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
  Logout(){

    localStorage.clear();
    this.router.navigate(['']);
  
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
