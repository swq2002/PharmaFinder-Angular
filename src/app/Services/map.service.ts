import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

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
    debugger;
    pharmacies.sort((pharmacyA, pharmacyB) => {
      const distanceA = this.calculateDistance(
        userLocation.lat,
        userLocation.lng,
        pharmacyA.lat,
        pharmacyA.lng
      );
      
      const distanceB = this.calculateDistance(
        userLocation.lat,
        userLocation.lng,
        pharmacyB.lat,
        pharmacyB.lng
      );
  
      return distanceA - distanceB;
    });
  
    return pharmacies;
  }
  
  }




