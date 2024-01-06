import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  constructor(public admin:AdminServicesService){}

  ngOnInit(): void {
    this.admin.GetAllInformationOrders();
  }

}
