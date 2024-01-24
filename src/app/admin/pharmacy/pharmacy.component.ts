import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { GetAllMedcineInPharmacyComponent } from '../get-all-medcine-in-pharmacy/get-all-medcine-in-pharmacy.component';
import { MapService } from 'src/app/Services/map.service';
import { LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
  styles: [`

table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    th {
      background-color: #f2f2f2;
    }
  h2 {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

  button {
    background-color: #4285f4;
    color: white;
  }
`]
})

export class PharmacyComponent implements OnInit {
  
  @ViewChild('callDeletesDailog') callDelete!: TemplateRef<any>
  @ViewChild('createPharmacDailog') createPharmacDailog!: TemplateRef<any>
  @ViewChild('addPharmacy') addPharmacy!: TemplateRef<any>

  @ViewChild('up') updatePharmacDailog!: TemplateRef<any>
  @Output() pharmacyDetals = new EventEmitter

  pharmacyName: string = '';
  PharmacyDetails: any = [{}];
  pharmacyId: number = 1;
  clickedLocation:any;
  map: any;
  openMedicineDialog(obj: any): void {

    this.pharmacyId = obj.pharmacyid;
    debugger
    console.log()
    const dialogRef = this.dialog.open(GetAllMedcineInPharmacyComponent, {
      width: '1000px',

      data: { PharmacyDetails: this.PharmacyDetails }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




  numberOfPharmac: number | undefined
  constructor(private mapService: MapService,public adminService: AdminServicesService, public dialog: MatDialog, private router: Router) {
    console.log(adminService.str);
  }
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.adminService.GetAllPharmacy();
    this.numberOfPharmac;
  }

  DeletePharmcy(id: number) {

    const dialogRef = this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        this.adminService.DeletePharmacyByID(id);
      }
      else {
        console.log('consele delete');
      }
    })
  }


  CreatePharmacy: FormGroup = new FormGroup({
    pharmacyname: new FormControl('', Validators.required),
    location: new FormControl(),
    address: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phonenumber: new FormControl('', Validators.required)
  })
  updatePharmacy: FormGroup = new FormGroup({
    pharmacyid: new FormControl('', Validators.required),
    pharmacyname: new FormControl('', Validators.required),
    location: new FormControl(),
    address: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', Validators.required)
  })
  OpenCreateDialog() {
    this.updatePharmacy.controls['location'].setValue("Jordan");

    const dialogRef = this.dialog.open(this.createPharmacDailog);
  }
  CreatePharm() {

    this.adminService.CreatedPharmicy(this.CreatePharmacy.value);
  }
  Cancel() {
    console.log('consal');
  }
  OpenAddPharLoc() {
    this.mapService.getCurrentLocation().then((location: any) => {
      this.map = this.mapService.createMap(location.lat, location.lng);
      this.map.on('click', (event: any) => {
        this.addMarker(event);
      });
    });
  
    const dialogRef = this.dialog.open(this.addPharmacy,{
      width: '700px',
    });
  }
  addMarker(event: any): void { 
     this.clickedLocation = {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    };
  
    console.log('Marker Location:', this.clickedLocation);
  
    this.mapService.addMarkerOnClick(this.map).subscribe((markerLocation) => {
    });
  } 
  savePharmaLoc() {
    const lngControl = this.updatePharmacy.get('lng');
  console.log(lngControl?.value);
    if (lngControl?.value == "") {
      this.CreatePharmacy.controls['lng'].setValue(this.clickedLocation.lng);
      this.CreatePharmacy.controls['lat'].setValue(this.clickedLocation.lat);
    } else {
      this.updatePharmacy.controls['lng'].setValue(this.clickedLocation.lng);
      this.updatePharmacy.controls['lat'].setValue(this.clickedLocation.lat);
    }
  }
  

  openUpdateDailog(obj: any) {

    this.pData = obj;
    this.updatePharmacy.controls['location'].setValue("Jordan");
    this.updatePharmacy.controls['pharmacyid'].setValue(this.pData.pharmacyid);
    this.updatePharmacy.controls['lat'].setValue(this.pData.lat);
    this.updatePharmacy.controls['lng'].setValue(this.pData.lng);

    const dialogRef = this.dialog.open(this.updatePharmacDailog)
  }
  pData: any;
  update() {


    this.adminService.updatePharmacy(this.updatePharmacy.value);
  }


  pharmacydetlis(id: number) {

    this.router.navigate(['admin/pharmacydetails'], { queryParams: { id } })

    // this.pharmacyDetals.emit();
  }



  MedicineinOrder(id: number) {

    this.router.navigate(['admin/medicineInOrder'], { queryParams: { id } });
  }
}