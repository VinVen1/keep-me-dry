import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from '@kmd/shared/interfaces/weather';
import { environment } from '../../../environments/environment';
import { UnitMeasure } from '@kmd/shared/interfaces/unit-measure.type';

type Languages = 'it' | 'en';

interface WeatherParams {
  lon: number;
  lat: number;
  lang: Languages;
  units: UnitMeasure;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherHttpService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = `${environment.apiUri}/data/3.0/onecall`;

  /**
   * Get all weather data by latitude and longitude
   * @param params
   */
  getAllBy(params: WeatherParams): Observable<WeatherResponse> {
    return this._http.get<WeatherResponse>(`${this._apiUrl}`, {
      params: {
        ...params,
      },
    });
  }
}
