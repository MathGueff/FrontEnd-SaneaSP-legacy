import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'environments/environment';
import { DataLocation } from '@shared/models/data-location';

@Injectable({ providedIn: 'root' })
export class GeocodingService {


  constructor(private http: HttpClient) {}

  geolocation(endereco: string): Observable<DataLocation> {
   // const url = `http://localhost:3000/location/geoconding?endereco=${encodeURIComponent(endereco)}`;

    return this.http.get<DataLocation>("http://localhost:3000/location/geoconding?endereco= Rua Comendador Vicente do Amaral, 334, Sorocaba, São Paulo, Brazil")
  }
}
