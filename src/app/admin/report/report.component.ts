import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { Subject } from "rxjs";


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  constructor(public admin:AdminServicesService){}
  monthlyReport: any[] = [];
  annualReport: any[] = [];
  selectedMonth: number = new Date().getMonth() + 1; 
  selectedYear: number = new Date().getFullYear();
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  searchResults: any[] = [];
  AnnualSalesCount: any = this.annualReport.length;
  MonthlySalesCount: any = this.monthlyReport.length;



  ngOnInit(): void {
    this.admin.GetAllInformationOrders();
    this.getSalesByMonthReport(this.selectedMonth, this.selectedYear);
    this.getSalesByYearReport(this.selectedYear);
  }


  
  getSalesByMonthReport(month: number, year: number): void {
    this.admin.getAllSalesByMonthReport(month, year)
      .subscribe(response => {
        console.log('API Response:', response);
        this.monthlyReport = response;
        this.MonthlySalesCount = this.monthlyReport.length;
      }, error => {
      });
  }

  getSalesByYearReport(year: number): void {
    this.admin.getSalesByYearReport(year)
      .subscribe(response => {
        console.log('API Response:', response);
        this.annualReport = response;
        this.AnnualSalesCount = this.annualReport.length;
      }, error => {
      });
  }


  searchSales(dateFrom: Date, dateTo: Date): void {
    this.admin.searchSales({ DateFrom: dateFrom, DateTo: dateTo }).subscribe(
      (results) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error during sales search:', error);
        // Handle the error if needed
      }
    );
  }

}
