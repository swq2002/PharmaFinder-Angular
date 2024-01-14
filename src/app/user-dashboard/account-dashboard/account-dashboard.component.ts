import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import Chart, { ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {
  constructor(public home:HomeService, private router: Router, private elementRef: ElementRef){}

  totalProfitCanvas: any;

  ngOnInit(): void {
    this.home.GetAllInformationOrders();

    this.home.GetAllInformationOrders1();
  
    const dashboardProgress1 = this.elementRef.nativeElement.querySelector('.dashboard-progress-1') as HTMLElement;
    const dashboardProgress2 = this.elementRef.nativeElement.querySelector('.dashboard-progress-2') as HTMLElement;
    const dashboardProgress3 = this.elementRef.nativeElement.querySelector('.dashboard-progress-3') as HTMLElement;

    

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

