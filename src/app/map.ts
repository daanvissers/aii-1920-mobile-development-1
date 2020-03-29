export interface IGeomitry {
  type: string;
  coordinates: number[];
}

export interface IGeoJson {
  type: string;
  geomitry: IGeomitry;
  properties?: any;
  $key?: string;
}

// Part of the GeoJson spec
export class GeoJson implements IGeoJson {
  type = 'Feature';
  geomitry: IGeomitry;

  constructor(coordinates, public properties?) {
    this.geomitry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}

// Part of the GeoJson spec
export class FeatureCollection {
  type = 'FeatureCollection';
  constructor(public features: Array<GeoJson>) {}
}
