import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../services/map.service';
import { PopoverController } from '@ionic/angular';
import { ItemsComponent } from '../../components/items/items.component';
import { GeoJson } from '../../interfaces/geometry';
import { Router } from '@angular/router';
import { BoxComponent } from '../../components/box/box.component';
import {StorageService} from '../../services/storage.service';

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

  // Settings
  place: boolean;
  hitboxes: boolean;
  interaction: boolean;

  constructor(private mapService: MapService,
              public popoverController: PopoverController,
              private router: Router,
              private storage: StorageService) { }

  ngOnInit() {
    this.markers = this.mapService.getMarkers();
    console.log(this.interaction);
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

        const coordinates = [this.lng, this.lat];
        this.addMarker(coordinates, '/assets/images/player/boy.png');
      });
    }
    console.log(this.interaction);
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

    this.storage.getSettings('interaction').then(res => {
      this.interaction = res;
      this.map.interactive = res;
      console.log('[MAP] Interaction: ' + this.interaction);
    });
    this.storage.getSettings('place').then(res => {
      this.place = res;
      console.log('[MAP] Place: ' + this.place);
    });
    this.storage.getSettings('hitboxes').then(res => {
      this.hitboxes = res;
      this.map.showCollisionBoxes = res;
      console.log('[MAP] Hitboxes: ' + this.hitboxes);
    });

    // Add Navigation controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add Realtime Firebase Data on map load
    this.map.on('load', (event) => {
      // Subscribe to realtime database and set source
      this.markers.subscribe(markers => {
        // For now, manually load all Pokémon, and remove them from the map
        // later when they're caught or fled from
        markers.forEach(element => {
          const url = '/assets/images/icons/pokemon/' + element.properties.message + '.gif';
          this.addMarker(element.geometry.coordinates, url, element.properties.message);
        });
      });
    });

    // Only add Map-OnClickListener if said so in the settings
    this.storage.getSettings('place').then(res => {
      if (res == true) {
        // Add Marker on Click-listener
        this.map.on('click', (event) => {
          const coordinates = [event.lngLat.lng, event.lngLat.lat];
          let number = Math.floor(Math.random() * 386) + 1;
          const newMarker = new GeoJson(coordinates, { message: number});
          this.mapService.createMarker(newMarker);
          console.log('Added marker on: ' + newMarker.geometry.coordinates);
        });
      }
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
    image.style.imageRendering = 'pixelated';
    image.style.background = 'url("' + imageUrl + '") no-repeat center center/contain';

    // Add Marker data and onclick
    el.addEventListener('click', () => {
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
    });
  }

  async openBag(ev: any) {
    const popover = await this.popoverController.create({
      component: ItemsComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async openBox(ev: any) {
    const popover = await this.popoverController.create({
      component: BoxComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
