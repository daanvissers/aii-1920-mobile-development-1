import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  // Default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/daanvissers/ck7wbqxy001b01ipm70zd7igd';
  lat = 51.26;
  lng = 5.28;

  constructor(private mapService: MapService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  ionViewDidEnter() {
    this.map.resize();
  }

  initializeMap() {
    // Locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.resize();
        this.map.flyTo({
          center: [this.lng, this.lat]
        });

        let coordinates = [this.lng, this.lat];
        console.log("Player Coordinates: " + coordinates);
        this.addMarker(coordinates, "/assets/images/player/boy.png");
      });
    }

    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 18,
      pitch: 65,
      bearing: -17.6,
      center: [this.lng, this.lat]
    });

    // Add Navigation controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  addMarker(coordinates, imageUrl) {
    // Create a DOM element for the marker
    const el = document.createElement('div');
    const image = document.createElement('div');
    el.appendChild(image);
    el.className = 'marker';
    el.style.width = ('60px');
    el.style.height = ('60px');

    image.style.width = '100%';
    image.style.height = '100%';
    image.style.imageRendering = "pixelated";
    image.style.background = 'url("' + imageUrl + '") no-repeat center center/contain';

    // Add marker to the map
    const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates).addTo(this.map);
  }

}
