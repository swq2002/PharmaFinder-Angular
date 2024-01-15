import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AdminModule } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import Chart, { ChartType } from 'chart.js/auto';
import { AuthService } from 'src/app/Services/auth.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userdata: any;
  token:any;
  numberOfMedicine: number = 0;
  salesOfOrder: any = [];
  pharmacy: any;
  totalProfitCanvas: any;
  pieChartData: any;
  router: any;
  constructor(public adminService: AdminServicesService, private http: HttpClient, private elementRef: ElementRef, public auth:AuthService) { }


  numberOfMed() {
    this.NumberOfUsersRegistered();
  }

  numberOfUsersRegistered: any = {};

  NumberOfUsersRegistered() {
    debugger;
    this.http.get('https://localhost:7274/api/User/GetUserCount').subscribe(
      (resp) => {
        debugger;
        this.numberOfUsersRegistered = resp;
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

  ngOnInit(): void {
    this.numberOfMed();

    this.adminService.CalculateProfitForPaidOrders().subscribe((resp: any) => {
      const label = resp.map((item: any) => item.month);
      const data = resp.map((item: any) => item.value)
      console.log(resp);
      this.GenerateChartMonthlyReport(label, data)

    }, err => {
      console.log(err.message);
      console.log(err.status);
    });


    this.token = this.auth.getCurrentUser();
   
    this.adminService.getUserbyId(this.token.userid).subscribe(
      (data: any) => {
        this.userdata = data;
      },
      (err) => {
        console.error(err);
      }
    );


    this.adminService.CalculateAnnualProfitForPaidOrders().subscribe((resp: any)=>{
      const label = resp.map((item: any) => item.year);
      const data = resp.map((item:any) => item.value)
      console.log(resp);
     this.GenerateChartAnnualReport(label, data)
      
    },(err: { message: any; status: any; })=>{
      console.log(err.message);
      console.log(err.status);
    });










    this.adminService.CalculateTotalOrderPrice();
    this.adminService.GetPharmacyCount();
    const dashboardProgress1 = this.elementRef.nativeElement.querySelector('.dashboard-progress-1') as HTMLElement;
    const dashboardProgress2 = this.elementRef.nativeElement.querySelector('.dashboard-progress-2');
    const dashboardProgress3 = this.elementRef.nativeElement.querySelector('.dashboard-progress-3');



    if (dashboardProgress1) {
      $(dashboardProgress1).circleProgress({
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
      $(dashboardProgress2).circleProgress({
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
      $(dashboardProgress3).circleProgress({
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



  GenerateChartAnnualReport(labels: any, values: any) {

    const data = {
      labels: labels,

      datasets: [{
        label: 'Annual Report',
        data: values,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const ctx = document.getElementById('Annual') as HTMLCanvasElement;


    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,

    });

  }



  GenerateChartMonthlyReport(labels: any, values: any) {

    const data = {
      labels: labels,
      datasets: [{
        label: 'Monthly Report',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    const ctx = document.getElementById('Monthly') as HTMLCanvasElement;
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });

  }
  CalculateTotalOrderPrice() {
    this.http.get<number>('https://localhost:7274/api/Orders/CalculateTotalOrderPrice').subscribe(
      (resp) => {
        this.salesOfOrder = resp;
        this.pieChartData = [this.salesOfOrder];
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }


  renderChart(data: any) {
    const ctx = document.getElementById('totalProfit') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {}
    });
    console.log(data);
  }



}


