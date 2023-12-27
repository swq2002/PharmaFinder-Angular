import { Component } from '@angular/core';
import { PrescriptionService } from '../Services/prescription.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-by-prescription',
  templateUrl: './order-by-prescription.component.html',
  styleUrls: ['./order-by-prescription.component.css']
})
export class OrderByPrescriptionComponent {
  constructor(
    public preService: PrescriptionService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  medicines: any;

  async search(file: any) {
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
}
