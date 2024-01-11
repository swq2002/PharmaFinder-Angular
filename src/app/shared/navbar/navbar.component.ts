import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:any
  constructor( private auth:AuthService, private router:Router){}
  async ngOnInit() {
    debugger;
    this.user= await this.auth.getCurrentUser();
    console.log('User:', this.user);

  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
Logout(){

    localStorage.clear();
    this.router.navigate(['']);
  
}

}
