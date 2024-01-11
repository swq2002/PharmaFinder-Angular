import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { Subject } from "rxjs";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})


export class ReportComponent implements OnInit{
  constructor(public admin:AdminServicesService){}
  monthlyReport: any[] = [];
  annualReport: any[] = [];
  selectedMonth: number = 1;// new Date().getMonth() + 1; 
  selectedYear: number = 2023; // new Date().getFullYear();
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  searchResults: any[] = [];
  AnnualSalesCount: any = this.annualReport.length;
  MonthlySalesCount: any = this.monthlyReport.length;

  defaultReport: any[]=[];
  isMonthlyReport: boolean = false;
  isAnnualReport: boolean = false;
  isSearchResults: boolean = false;

  ngOnInit(): void {
    this.admin.GetAllInformationOrders();
    //this.getSalesByMonthReport(this.selectedMonth, this.selectedYear);
    this.getSalesByYearReport(this.selectedYear);

  }
  
  getSalesByMonthReport(month: number, year: number): void {
    this.admin.getAllSalesByMonthReport(month, year)
      .subscribe(response => {
        console.log('API Response:', response);
        this.monthlyReport = response;
        this.MonthlySalesCount = this.monthlyReport.length;
        this.isMonthlyReport = true;
        this.isAnnualReport = false;
        this.isSearchResults = false;
      }, error => {
      });
  }

  getSalesByYearReport(year: number): void {
    this.admin.getSalesByYearReport(year)
      .subscribe(response => {
        console.log('API Response:', response);
        this.annualReport = response;
        this.AnnualSalesCount = this.annualReport.length;
        this.isMonthlyReport = false;
        this.isAnnualReport = true;
        this.isSearchResults = false;
      }, error => {
      });
  }


  searchSales(dateFrom: Date, dateTo: Date): void {
    this.admin.searchSales({ DateFrom: dateFrom, DateTo: dateTo }).subscribe(
      (results) => {
        this.searchResults = results;
        this.isMonthlyReport = false;
        this.isAnnualReport = false;
        this.isSearchResults = true;
      },
      (error) => {
        console.error('Error during sales search:', error);
      }
    );
  }
  exportToPDF(): void {
    const doc = new jsPDF();

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    const specialElementHandlers = {
      '#editor': function (element: HTMLElement, renderer: any) {
        return true;
      },
    };

    doc.addImage("assets/HomeAssets/img/logo00.jpg", "JPEG", 20, 5, 40, 15);
    doc.setFont("helvetica", "bold");
    const fontSize = 27; 
    doc.setFontSize(fontSize);
    const fontColor = [120, 120, 120]; 
    doc.setTextColor(fontColor[0], fontColor[1], fontColor[2]);
    doc.text("Report", 90, 45);

    (doc as any).autoTable({
      html: '#table-data',
      margin: { top: 80 },
      didDrawCell: function (hookData: any) {
         const tableHeaderColor = [155, 223, 193]; 

         hookData.doc.setFillColor.apply(null, tableHeaderColor);
        hookData.doc.rect(30, 50, hookData.doc.internal.pageSize.width - 60, 2, 'F');
      }
    });

    doc.save('report.pdf');
}

  exportToExcel(): void {
    const table = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'report.xlsx');
  }


}




