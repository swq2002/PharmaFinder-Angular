import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MapService } from '../Services/map.service';
import { AdminServicesService } from '../Services/admin-services.service';
import { PrescriptionService } from '../Services/prescription.service';
@Component({
  selector: 'app-product-result',
  templateUrl: './product-result.component.html',
  styleUrls: ['./product-result.component.css']
})
export class ProductResultComponent implements AfterViewInit{
  medicines: any;
  pharmacy: any[] = [];
  map: any;
   position:any;
  @ViewChild('callItemDailog') callItemDailog!: TemplateRef<any>

  constructor(private adminService: AdminServicesService,private mapService: MapService,private route: ActivatedRoute ,public dialog:MatDialog,private toaster:ToastrService,private prescriptionService: PrescriptionService) {
    this.route.queryParams.subscribe(params => {
      // if (params['medicines']) {
      //   this.medicines = JSON.parse(params['medicines']);
      // }
      this.medicines=prescriptionService.nearestMedicines;
    });
  }

  async ngAfterViewInit() {
    try {
      this.position = await this.mapService.getCurrentLocation();
      console.log(this.position);

      this.map = await this.mapService.createMap(this.position.lat, this.position.lng);
      
      const resp = await this.adminService.GetAllPharmacyformap().toPromise();
      this.pharmacy = resp;
      this.mapService.addPharmacyMarkers(this.map, this.pharmacy);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  ItemDialog(medicinee:any){
    this.dialog.open(this.callItemDailog, {
      data: { medicine: medicinee }});


  }
  AddToCart(medicinee: any) {
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.toaster.success('Added to cart');

    const existingMedicineIndex = cart.findIndex(
      (item: any) => item.medicineid === medicinee.medicineid
    );
  
    if (existingMedicineIndex !== -1) {
      cart[existingMedicineIndex].quantity += 1; 
    } else {
      cart.push({ ...medicinee, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  }
 flyToPharmacy(pharmacy: any) {
   const pharmacyLocation = { lat: pharmacy.lat, lng: pharmacy.lng };
  this.mapService.flyToPharmacyLocation(pharmacyLocation,this.map);
  this.mapService.drawLineBetweenLocations(this.map,this.position,pharmacyLocation);
 }
 }
