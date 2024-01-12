


import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { MapService } from '../Services/map.service';
import { ToastrService } from 'ngx-toastr';
declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private adminService: AdminServicesService, private mapService: MapService, private toaster: ToastrService,
  ) { }
  pharmacies: any[] = [];
  map: any;
  searchValue: string = ''
  nearestPharmacies: any;
  position: any = {};
  async ngOnInit() {

     this.position = await this.mapService.getCurrentLocation();
    
    console.log(this.position);


  
   this.map = L.map('map', { scrollWheelZoom: false }).setView([this.position.lat,this.position.lng], 12);
   const marker = L.marker([this.position.lat,this.position.lng]).addTo(this.map);
   const circle = L.circle([this.position.lat,this.position.lng],{color:"blue",fillColor:"black",fillOpacity:0.5,radius:700}).addTo(this.map);

   
    
    // let lat
    // let lng
    // try {
    //   const position: any = await this.mapService.getCurrentLocation();
    //   lat = position.lat
    //   lng = position.lng
    // }

    // catch (err) {
    //   lat = 502412121;
    //   lng = 41545451;
    // }

    
    //  this.map = L.map('map').setView([lat,lng], 13);
    
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXlhaGhheW1vdXIiLCJhIjoiY2xxZ2M3MGdlMDhvbzJqbzBzcmdzZTBhZiJ9.C8yY6rsw2ZNOTq3LuxO6fQ',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token',
      }
    ).addTo(this.map);

    this.GetAllPharmacies(this.position)



  }



  GetAllPharmacies(position: any) {
    debugger
    this.adminService.GetAllPharmacyformap().subscribe(resp => {
      this.pharmacies = resp;
      this.nearestPharmacies = this.mapService.findNearestPharmacies(position, this.pharmacies)
      resp?.forEach((pharmacy: any) => {
        const pharmacyLatLng = [pharmacy.lat, pharmacy.lng];

        let LeafIcon = L.icon({
          iconUrl: './assets/HomeAssets/img/bg/pharmacy-svgrepo-com.svg',
          iconSize: [38, 95],
          shadowSize: [50, 64],
          iconAnchor: [22, 94],
          shadowAnchor: [4, 62],
          popupAnchor: [-3, -76]
        });

        const marker = L.marker(pharmacyLatLng, { icon: LeafIcon }).addTo(this.map);
        marker.bindPopup(`<b>${pharmacy.pharmacyname}</b><br>${pharmacy.address}`);


      });
    });
  }

  search() {
    const foundPharmacy = this.pharmacies.find(pharmacy =>
      pharmacy.pharmacyname.toLowerCase() === this.searchValue.toLowerCase()


    );



    if (foundPharmacy) {

      const pharmacyLatLng = [foundPharmacy.lat, foundPharmacy.lng];
      this.pharmacies = [foundPharmacy]

      this.map.flyTo(pharmacyLatLng, 13);

    }

    else {
      this.GetAllPharmacies(this.position)
      this.toaster.warning("There is no pharmacy with this name");
    }


  }


};