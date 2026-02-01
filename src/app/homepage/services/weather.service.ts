import {computed, inject, Injectable, signal} from '@angular/core';
import {WeatherHttpService} from '@kmd/shared/http';
import {WeatherResponse} from '@kmd/shared/interfaces/weather';
import {LoadingService, UnitMeasureService} from '@kmd/shared/services';
import {finalize} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly _weatherHttp = inject(WeatherHttpService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _unitMeasure = inject(UnitMeasureService)
  private readonly _weatherState = signal<WeatherResponse>({
    lat: 0,
    lon: 0,
    timezone: '',
    timezone_offset: 0,
    current: undefined,
    hourly: [],
    minutely: [],
    daily: [],
    alerts: []
  });

  readonly current = computed(() => this._weatherState().current);
  readonly hourly = computed(() => this._weatherState().hourly ?? [ ]);
  readonly daily = computed(() => this._weatherState().daily ?? []);
  readonly alerts = computed(() => this._weatherState().alerts ?? []);
  readonly currentTime = computed(() => new Date(this.current()?.dt ?? ''))

  getAllWeather(): void {
    this._loadingService.show()
    this._weatherHttp.getAllBy({lat:40.79, lon: 14.35, lang: 'it', units: this._unitMeasure.selectedUnit()})
      .pipe(
        finalize(() => this._loadingService.hide()),
      )
      .subscribe({
        next: response => this._weatherState.set(response)
      })
  }


}
