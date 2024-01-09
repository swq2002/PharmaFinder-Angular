import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { AdminModule } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import Chart, { ChartType } from 'chart.js/auto';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // @ViewChild('totalProfitCanvas') totalProfitCanvas!: ElementRef<HTMLCanvasElement>;

  numberOfMedicine: number = 0;
  salesOfOrder: any = [];
  pharmacy: any;
  totalProfitCanvas: any;
  pieChartData: any;

  constructor(public adminService: AdminServicesService, private http: HttpClient,private elementRef: ElementRef) {}

  public pieChartType: ChartType = 'line';
  public pieChartType2: ChartType = 'bar';
  
   numberOfMed() {
    // this.adminService.GetAllMedicine();
    // console.log(this.numberOfMedicine);
    this.NumberOfUsersRegistered();
  }

  numberOfUsersRegistered: any = {};
  
  NumberOfUsersRegistered() {
    debugger;
    this.http.get('https://localhost:7274/api/User/GetUserCount').subscribe(
      (resp) => {
        debugger;
        this.numberOfUsersRegistered = resp; // Assign the value to adminService
      },
      (err) => {
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

  ngOnInit(): void {
    this.numberOfMed();
    // this.fetchAndRenderChart();

    setTimeout(() => {
   
      let catarr = ["Frontend" , "Backend" , "Database"]
       this.pieChartData= {
        labels: catarr,
        datasets: [
          {
            data: [1,5,3],
          },
        ],
      };
  }, 1000);
    this.adminService.CalculateTotalOrderPrice();
    this.adminService.GetPharmacyCount();
    const dashboardProgress1 = this.elementRef.nativeElement.querySelector('.dashboard-progress-1') as HTMLElement;
    const dashboardProgress1Dark = this.elementRef.nativeElement.querySelector('.dashboard-progress-1-dark');
    const dashboardProgress2 = this.elementRef.nativeElement.querySelector('.dashboard-progress-2');
    const dashboardProgress2Dark = this.elementRef.nativeElement.querySelector('.dashboard-progress-2-dark');
    const dashboardProgress3 = this.elementRef.nativeElement.querySelector('.dashboard-progress-3');
    const dashboardProgress3Dark = this.elementRef.nativeElement.querySelector('.dashboard-progress-3-dark');
    const dashboardProgress4 = this.elementRef.nativeElement.querySelector('.dashboard-progress-4');
    const dashboardProgress4Dark = this.elementRef.nativeElement.querySelector('.dashboard-progress-4-dark');


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


renderChart(data: any) {
  const ctx = document.getElementById('totalProfit') as HTMLCanvasElement;
  const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {} 
  });
  console.log(data);
}

// fetchAndRenderChart(): void {
//   this.http.get('https://localhost:7274/api/Orders/CalculateTotalOrderPrice').subscribe((resp: any) => {
//     this.salesOfOrder = resp;
//     console.log(resp);
    
//     if (this.totalProfitCanvas) {
//       const barChartCanvas = this.totalProfitCanvas.nativeElement.getContext('totalProfit');
//       const ct = document.getElementById('totalProfit') as HTMLCanvasElement;

//       if (ct) {
//         // const labels = this.salesOfOrder.map((item: any) => item.salesOfOrder); 
//         // console.log(labels);
        
//         // const labels = Utils.months({count: 7});
//         const data = {
//           datasets: [{
//             labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
//             data: [65, 59, 80, 81, 56, 55, 40],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//           }]
//         };
//         const ct = document.getElementById('totalProfit') as HTMLCanvasElement;

//         const chart = new Chart(ct, {
//           type: 'pie',
//           data: data,
//         });
//       }
//     }
//   }, err => {
//     console.log(err.message);
//     console.log(err.status);
//   });
// }

  
}
