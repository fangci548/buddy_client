import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { google } from "google-maps";

declare var google: any;
let map: google.maps.Map;
let infoWindow: google.maps.InfoWindow;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  //map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  constructor(public nav: NavController,) { }

  ngOnInit() {
    //this.showMap();
    this.initMap();
  }

  // showMap(){
  //   const location = new google.maps.LatLng(-17.824858, 31.053028);
  //   const options = {
  //     center: location,
  //     zoom: 15,
  //     disableDefauleUI: true
  //   }
  //   this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  // }

  goback() {
    this.nav.back();
    this.nav.navigateBack('/tabs/tab3');
  }

  initMap(): void {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 24.17905715921448, lng: 120.64672100528603 },
      zoom: 15,
      mapTypeControl:false,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "獲取位置";
    locationButton.classList.add("custom-map-control-button");
    locationButton.style.width = '30%';
    locationButton.style.height = '5%';
    locationButton.style.background = 'green';
    locationButton.style.bottom = '5%';
    locationButton.style.top = '95%';

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);

            var marker = new google.maps.Marker({
              position: pos,
              map: map
            });
            infoWindow.open(map, marker);
            map.setCenter(pos);
          },
          () => {
            //handleLocationError(true, infoWindow, map.getCenter()!);
          }
        );
      }
    })
  }
}
