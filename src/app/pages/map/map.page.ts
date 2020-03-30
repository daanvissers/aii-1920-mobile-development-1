import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../services/map.service';
import { PopoverController } from '@ionic/angular';
import { ItemsComponent } from '../../components/items/items.component';
import { GeoJson } from '../../interfaces/geometry';
import { Router } from '@angular/router';

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

  // Data
  source: any;
  markers: any;

  constructor(private mapService: MapService,
              public popoverController: PopoverController,
              private router: Router) { }

  ngOnInit() {
    this.markers = this.mapService.getMarkers();
    console.log(this.markers);
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
      // Debug
      interactive: true,
      zoom: 18,
      pitch: 65,
      bearing: -17.6,
      center: [this.lng, this.lat]
    });

    // Debug
    // this.map.showCollisionBoxes = true;

    // Add Navigation controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add Marker on Click-listener
    // this.map.on('click', (event) => {
    //   const coordinates = [event.lngLat.lng, event.lngLat.lat];
    //   const newMarker = new GeoJson(coordinates, { message: "19"});
    //   this.mapService.createMarker(newMarker);
    //   console.log("Added marker on: " + newMarker.geomitry.coordinates);
    // });

    // Add Realtime Firebase Data on map load
    this.map.on('load', (event) => {
      // Register source
      // this.map.addSource('firebase', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: []
      //   }
      // });
      //
      // this.source = this.map.getSource('firebase');

      // Subscribe to realtime database and set source
      this.markers.subscribe(markers => {
        // For now, manually load all Pokémon, and remove them from the map
        // later when they're caught or fled from
        markers.forEach(element => {
          const url = "/assets/images/icons/pokemon/" + element.properties.message + ".gif";
          this.addMarker(element.geomitry.coordinates, url, element.properties.message);
        });
      });
    });
  }

  addMarker(coordinates, imageUrl, id?) {
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

    // Create optional popup?
    // var html = '<div class="marker-popup">I am a custom pop-up</div>';
    // var customPopUp = new mapboxgl.Popup(
    //     {
    //        anchor: 'bottom',   // To show popup on top
    //        offset: { 'bottom': [0, -10] },  // To prevent popup from over shadowing the marker.
    //        closeOnClick: true   // To prevent close on mapClick.
    //     }
    // ).setHTML(html); // You can set any valid HTML.

    el.addEventListener('click', () =>
    {
      this.router.navigate(['/battlescreen/' + id]);
    });

    // Add marker to the map
    const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        // .setPopup(customPopUp)
        .addTo(this.map);
  }

  removeMarker(marker) {
    this.mapService.deleteMarker(marker.$key);
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }

  async openBag(ev: any) {
    const popover = await this.popoverController.create({
      component: ItemsComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
