import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

import { GeoJson } from '../interfaces/geometry';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  currentMarker: any;

  constructor(private platform: Platform,
              private db: AngularFireDatabase) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMarkers(): any {
    return this.db.list('/markers').valueChanges();
  }

  createMarker(data: GeoJson) {
    return this.db.list('/markers').push(data);
  }

  deleteMarker($key: string) {
    return this.db.object(`/markers/${$key}`).remove();
  }

}
