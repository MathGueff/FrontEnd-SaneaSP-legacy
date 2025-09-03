export interface GeoJsonFeature {
  type: 'Feature';
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon';
    coordinates: number[]; // para Point: [lon, lat]
  };
  properties: {
    display_name?: string;
    [key: string]: any; // permite propriedades extras (ex.: população, id, etc.)
  };
}
