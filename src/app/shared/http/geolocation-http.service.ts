import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@kmd/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GeolocationHttpService {
  private readonly _apiUri = `${environment.apiUri}/geo/1.0`;
  private readonly _http = inject(HttpClient);

  getLocalities(query: string) {
    return this._http.get<Geolocation[]>(`${this._apiUri}/direct`, {
      params: {
        q: query,
        limit: 5,
      },
    });
  }

  getLocalityFromCoords(lat: number, lon: number) {
    return this._http.get<Geolocation[]>(`${this._apiUri}/reverse`, {
      params: {
        lat,
        lon,
      },
    });
  }
}
