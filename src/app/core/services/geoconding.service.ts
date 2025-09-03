import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GeoJsonFeature } from '@shared/models/geo-json.model';

@Injectable({ providedIn: 'root' })
export class GeocodingService {
  private apiKey = 'YOUR_API_KEY'; // substitua pela sua chave
  private apiUrl = 'https://us1.locationiq.com/v1/search.php';

  constructor(private http: HttpClient) {}

  geolocation(endereco: string): Observable<GeoJsonFeature | null> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${encodeURIComponent(endereco)}&format=json`;

    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results.length > 0) {
          const { lat, lon, display_name } = results[0];
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [parseFloat(lon), parseFloat(lat)] // GeoJSON usa [lon, lat]
            },
            properties: { display_name }
          }as GeoJsonFeature;
        }
        return null;
      })
    );
  }
}
