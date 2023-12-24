import { Component, OnInit } from '@angular/core';
declare const L:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  ngOnInit() {
    if(!navigator.geolocation){
      console.log('location is not supported');      
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(`lat:${position.coords.latitude},lon:${position.coords.longitude}`);

      let map = L.map('map').setView([coords.latitude,coords.longitude], 13);
    
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
            // let icon = L.icon({iconUrl:'assets/HomeAssets/img/bg/pharmacy-svgrepo-com.svg',iconSize:[350,600]});
            // L.marker([35,36],{icon:icon});
            // console.log(icon);
            let LeafIcon = L.Icon.extend({
              options: {
                  shadowUrl: 'assets/HomeAssets/img/bg/pharmacy-svgrepo-com.svg',
                  iconSize:     [38, 95],
                  shadowSize:   [50, 64],
                  iconAnchor:   [22, 94],
                  shadowAnchor: [4, 62],
                  popupAnchor:  [-3, -76]
              }

          }).addTo(map);
      // let marker = L.marker(latLong).addTo(map);
      // let popup = L.popup()
      // .setLatLng(latLong)
      // .setContent('')
      // .openOn(map);
      
  });


  

  }


  

}