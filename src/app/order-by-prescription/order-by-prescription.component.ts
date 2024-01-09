import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MapService } from '../Services/map.service';
import { PrescriptionService } from '../Services/prescription.service';

@Component({
  selector: 'app-order-by-prescription',
  templateUrl: './order-by-prescription.component.html',
  styleUrls: ['./order-by-prescription.component.css']
})
export class OrderByPrescriptionComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('orderInput') orderInput!: ElementRef;
  userLoc: any;
  txtInput: FormControl = new FormControl('');

  constructor(
    public preService: PrescriptionService,
    public mapService: MapService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.userLoc = await this.mapService.getCurrentLocation();
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  }

  medicines: any;
  nearestMedicines: any;

  async upload(file: any) {
    try {
      if (file.length === 0) {
        // Resetting medicines and disabling inputs if no file is selected
        this.medicines = null;
        this.disableInputs(true);
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
          this.disableUpload();
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

  disableUpload() {
    if (this.txtInput.value) {
      this.disableInputs(false);
    } else {
      this.disableInputs(true);
    }
  }

  async search() {
    try {
      this.spinner.show();
      if (!this.userLoc) {
        console.error('User location not available.');
        return;
      }

      if (this.medicines) {
        this.nearestMedicines = this.mapService.findNearestPharmacies(this.userLoc, this.medicines);
        this.spinner.hide();
        this.router.navigate(['/product-result']);

      } else if (this.txtInput.value) {
        debugger;
        await this.preService.prescriptionTxtSearch(this.txtInput.value)
          .then(async (resp: any) => {
            this.medicines = await resp;
            this.spinner.hide();
            if (this.medicines) {
              this.nearestMedicines = await this.mapService.findNearestPharmacies(this.userLoc, this.medicines);
              this.spinner.hide();
              this.router.navigate(['/product-result']);

            } else {
              this.router.navigate(['']);
            }
            this.disableInputs(true);
          })
          .catch((err) => {
            this.toaster.error('Something went wrong!');
            console.log(err);
            this.spinner.hide();
          });
      } else {
        this.router.navigate(['']);
      }

    } catch (error) {
      console.error('Error searching for nearest pharmacies:', error);
    }
  }

  disableInputs(isFileUploaded: boolean) {
    if (isFileUploaded) {
      this.orderInput.nativeElement.disabled = true;
      this.fileInput.nativeElement.disabled = false;
    } else {
      this.orderInput.nativeElement.disabled = false;
      this.fileInput.nativeElement.disabled = true;
    }
  }
}
