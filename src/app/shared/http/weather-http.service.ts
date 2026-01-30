import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeatherResponse} from '@kmd/shared/interfaces/weather';
import {environment} from '../../../environments/environment';

type Languages = "it" | "en";

@Injectable({
  providedIn: 'root',
})
export class WeatherHttpService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUri}`

  /**
   * Get all weather data by latitude and longitude
   * @param lat - Latitude, decimal(-90, 90)
   * @param lon - Longitude, decimal(-180, 180)
   * @param lang - Language
   */
  getAllBy(lat: number, lon: number, lang: Languages): Observable<WeatherResponse> {
    return this._http.get<WeatherResponse>(`${this._apiUrl}`, {
      params: {
        lat, lon, lang
      }
    })
  }

}
