
import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { MapService } from '../Services/map.service';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private adminService: AdminServicesService ,private mapService: MapService) { }
  pharmacy = [];
  
  async ngOnInit() {
 
      const position: any = await this.mapService.getCurrentLocation();
      console.log(position);

    
    let map = L.map('map').setView([32.548137, 35.8607008], 8);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXlhaGhheW1vdXIiLCJhIjoiY2xxZ2M3MGdlMDhvbzJqbzBzcmdzZTBhZiJ9.C8yY6rsw2ZNOTq3LuxO6fQ',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset:-1,
        accessToken: 'your.mapbox.access.token',
      }
    ).addTo(map);

    this.adminService.GetAllPharmacyformap().subscribe(resp => {
      this.pharmacy = resp;
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

        const marker = L.marker(pharmacyLatLng, { icon: LeafIcon }).addTo(map);
        marker.bindPopup(`<b>${pharmacy.pharmacyname}</b><br>${pharmacy.address}`).openPopup();
      });
    });
  }
  

}