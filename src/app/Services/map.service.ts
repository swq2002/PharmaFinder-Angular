import { Injectable } from '@angular/core';
declare const L: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private currentPolyline: any = null;

  constructor() { }
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log(
                'Latitude: ' +
                position.coords.latitude +
                ' Longitude: ' +
                position.coords.longitude
              );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };

              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  createMap(lat: number, lng: number) {

    const map=L.map('map', { scrollWheelZoom: false }).setView([lat, lng], 12);
    const marker = L.marker([lat,lng]).addTo(map);
   const circle = L.circle([lat,lng],{color:"blue",fillColor:"black",fillOpacity:0.5,radius:700}).addTo(map);

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
    ).addTo(map);
    return map;
  }

  addPharmacyMarkers(map: any, pharmacies: any[]) {
    if (!map) {
      console.error('Map object is undefined.');
      return;
    }
    pharmacies.forEach((pharmacy: any) => {
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
      marker.bindPopup(`<b>${pharmacy.pharmacyname}</b><br>${pharmacy.address}`);
    });
  }
 

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; 
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  findNearestPharmacies(userLocation: any, pharmacies: any[]): any[] {
     
    pharmacies.forEach((pharmacy) => {
      pharmacy.distance = this.calculateDistance(
        userLocation.lat,
        userLocation.lng,
        pharmacy.lat,
        pharmacy.lng
      );
      pharmacy.distance = parseFloat(pharmacy.distance.toFixed(2));
     
    });
  
    pharmacies.sort((pharmacyA, pharmacyB) => {
      return pharmacyA.distance - pharmacyB.distance;
    });
  
    return pharmacies;
  }
  flyToPharmacyLocation(pharmacyLocation: { lat: number; lng: number }, map:any) {
   map.flyTo(pharmacyLocation,13); 
    }

     drawLineBetweenLocations(map: any, startLocation: { lat: number; lng: number }, endLocation: { lat: number; lng: number }) {
      if (this.currentPolyline !== null) {
        map.removeLayer(this.currentPolyline);
      }
      const latlngs = [
        [startLocation.lat, startLocation.lng],
        [endLocation.lat, endLocation.lng]
      ];
      
      this.currentPolyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
      map.fitBounds(this.currentPolyline.getBounds());
    }
  }
  
  




