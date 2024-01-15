import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import Chart, { ChartType } from 'chart.js/auto';
import { AuthService } from 'src/app/Services/auth.service';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {
  constructor(public home:HomeService, private router: Router, private elementRef: ElementRef, public auth: AuthService, public admin:AdminServicesService){}
  userdata: any;
  token:any;
  totalProfitCanvas: any;
  paidOrderCount: number = 0;

  ngOnInit(): void {
    this.home.GetAllInformationOrders();

    this.home.GetAllInformationOrders1();

    this.paidOrderCount=this.home.paidOrderCount;
  
    const dashboardProgress1 = this.elementRef.nativeElement.querySelector('.dashboard-progress-1') as HTMLElement;
    const dashboardProgress2 = this.elementRef.nativeElement.querySelector('.dashboard-progress-2') as HTMLElement;
    const dashboardProgress3 = this.elementRef.nativeElement.querySelector('.dashboard-progress-3') as HTMLElement;

    this.token = this.auth.getCurrentUser();
   
    this.admin.getUserbyId(this.token.userid).subscribe(
      (data: any) => {
        this.userdata = data;
      },
      (err) => {
        console.error(err);
      }
    );
  

    if (dashboardProgress1) {
      ($(dashboardProgress1) as any).circleProgress({
        value: 0.70,
        size: 125,
        thickness: 7,
        startAngle: 80,
        fill: {
          gradient: ["#7922e5", "#1579ff"]
        }
      });
    }

    if (dashboardProgress2) {
      ($(dashboardProgress2)as any).circleProgress({
        value: 0.60,
        size: 125,
        thickness: 7,
        startAngle: 10,
        fill: {
          gradient: ["#429321", "#b4ec51"]
        }
      });
    }


    if (dashboardProgress3) {
      ($(dashboardProgress3)as any).circleProgress({
        value: 0.90,
        size: 125,
        thickness: 7,
        startAngle: 10,
        fill: {
          gradient: ["#f76b1c", "#fad961"]
        }
      });
    }
  }

  goToLogin(){
    this.router.navigate(['security/login']);
  }
  
  logout(){
    localStorage.clear();
    this.goToLogin();
    }


    

    







  }

