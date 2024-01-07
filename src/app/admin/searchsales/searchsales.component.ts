import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminServicesService } from 'src/app/Services/admin-services.service';

@Component({
  selector: 'app-searchsales',
  templateUrl: './searchsales.component.html',
  styleUrls: ['./searchsales.component.css']
})
export class SearchsalesComponent  implements OnInit{

  constructor(public adminService: AdminServicesService) {}
  ngOnInit(): void {
    debugger;
    const dateTo = this.searchSalesForm.get('dateTo')?.value;
    const dateFrom = this.searchSalesForm.get('dateFrom')?.value;

    const obj = {
      dateTo: dateTo,
      dateFrom: dateFrom
     };
    // obj.dateTo=null;
    // obj.dateFrom=null;
    this.adminService.SearchSales(obj).subscribe(
      (resp) => {
        this.searchSales = resp;
        this.searchSalesForm.get('dateTo')?.setValue(null);
        this.searchSalesForm.get('dateFrom')?.setValue(null);
      },
      (err) => {
        // Handle error
      }
    );    }

    clearDates() {
      this.searchSalesForm.get('dateTo')?.setValue(null);
      this.searchSalesForm.get('dateFrom')?.setValue(null);
    }

    // begin
    // orders_package.SalesSearch2('2022-11-11','2022-11-12');
    // end;

  searchSales: any = [{}];
  searchSalesForm: FormGroup = new FormGroup({
    dateTo: new FormControl(),
    dateFrom: new FormControl(),
  });

  Search() {
    debugger;
    const dateTo = this.searchSalesForm.get('dateTo')?.value;
    const dateFrom = this.searchSalesForm.get('dateFrom')?.value;

    const obj = {
      dateTo: dateTo,
      dateFrom: dateFrom
    };

    this.adminService.SearchSales(obj).subscribe(
      (resp) => {
        this.searchSales = resp;
      },
      (err) => {
        // Handle error
      }
    );
  }

}



