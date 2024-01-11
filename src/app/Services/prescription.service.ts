import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  nearestMedicines:any;

  constructor(private http: HttpClient,private toaster:ToastrService,private spinner:NgxSpinnerService) { }
 
  prescriptionSearch(file: FormData): Promise<any> {
    this.spinner.show();
    
    return new Promise((resolve, reject) => {
      this.http.post('https://localhost:7274/api/ReadPrescription/ReadPrescription', file)
        .subscribe(
          (resp: any) => {
            this.toaster.success('The file has been uploaded successfully');
            this.spinner.hide();
            this.nearestMedicines=resp;
                       resolve(resp); 
          },
          (err) => {
            this.toaster.error('Something went wrong!');
            this.spinner.hide();
            reject(err); 
          }
        );
    });
  }

  prescriptionTxtSearch(txt: string): Promise<any> {
    this.spinner.show();

   
    const encodedTxt = encodeURIComponent(txt);
    return new Promise((resolve, reject) => {
      this.http.get(`https://localhost:7274/api/ReadPrescription/ReadTxtPrescription/${encodedTxt}`)
        .toPromise()
        .then((resp: any) => {
          this.nearestMedicines=resp;

          this.spinner.hide();
          resolve(resp);
        })
        .catch((err) => {
          this.spinner.hide();
          reject(err);
        });
    });
  }

}
