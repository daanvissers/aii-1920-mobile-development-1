import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: any;

  constructor(private platform: Platform)
  {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

}
