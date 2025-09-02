import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  searchAddress(street: string,number:string,city:string): Observable<{ lat: number; lon: number } | null> {
    const url = `${this.NOMINATIM_URL}https://nominatim.openstreetmap.org/search?street=${street}+${number}&city=${city}&state=SP&country=Brasil&?format=json&q=${encodeURIComponent(street)}`;

    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results.length > 0) {
          return {
            lat: parseFloat(results[0].lat),
            lon: parseFloat(results[0].lon)
          };
        }
        return null;
      })
    );
  }
}
