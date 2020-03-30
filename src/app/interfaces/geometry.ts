export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties?: any;
  $key?: string;
}

// Part of the GeoJson spec
export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates
    };
  }
}

// Part of the GeoJson spec
export class FeatureCollection {
  type = 'FeatureCollection';
  constructor(public features: Array<GeoJson>) {}
}
