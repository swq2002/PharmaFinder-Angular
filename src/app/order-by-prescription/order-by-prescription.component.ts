import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../Services/prescription.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MapService } from '../Services/map.service';

@Component({
  selector: 'app-order-by-prescription',
  templateUrl: './order-by-prescription.component.html',
  styleUrls: ['./order-by-prescription.component.css']
})
export class OrderByPrescriptionComponent implements OnInit{
  userLoc:any;
  constructor(
    public preService: PrescriptionService,
    public mapService: MapService,

    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router:Router
  ) { }


  async ngOnInit() {
    try {
      this.userLoc = await this.mapService.getCurrentLocation();
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  }
  medicines: any;
  nearestMedicines:any;
  async upload(file: any) {
    try {
      if (file.length === 0) {
        return;
      }

      let fileToSearch = <File>file[0];
      const formData: FormData = new FormData();
      formData.append('file', fileToSearch, fileToSearch.name);

      this.spinner.show();
      this.preService.prescriptionSearch(formData)
        .then((resp: any) => {
          this.medicines = resp;
          this.spinner.hide();
        })
        .catch((err) => {
          this.toaster.error('Something went wrong!');
          this.spinner.hide();
          console.error('File upload error:', err);
        });
    } catch (error) {
      console.error('File upload error:', error);
    }
  }

  async search() {
    try {
      if (!this.userLoc) {
        console.error('User location not available.');
        return;
      }

      this.nearestMedicines = this.mapService.findNearestPharmacies(this.userLoc, this.medicines);
      this.router.navigate(['/product-result'], {
        queryParams: { medicines: JSON.stringify(this.nearestMedicines) }
      });
    } catch (error) {
      console.error('Error searching for nearest pharmacies:', error);
    }
  }

}
