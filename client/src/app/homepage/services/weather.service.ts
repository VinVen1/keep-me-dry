import { computed, inject, Injectable, signal } from '@angular/core';
import { WeatherHttpService } from '@kmd/shared/http';
import {
  CurrentWeatherInfo,
  DailyWeatherInfo,
  HourlyWeatherInfo,
  WeatherInfo,
  WeatherResponse,
} from '@kmd/shared/interfaces/weather';
import { CacheService, LoadingService, UnitMeasureService } from '@kmd/shared/services';
import { finalize } from 'rxjs';
import { DEFAULT_LAT, DEFAULT_LON } from '@kmd/shared/utils';

const CACHE_KEY = 'weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly _weatherHttp = inject(WeatherHttpService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _unitMeasure = inject(UnitMeasureService);
  private readonly _cache = inject(CacheService);

  private readonly _weatherState = signal<WeatherResponse>({
    lat: 0,
    lon: 0,
    timezone: '',
    timezone_offset: 0,
    current: undefined,
    hourly: [],
    minutely: [],
    daily: [],
    alerts: [],
  });

  readonly current = computed(() => {
    const _current = this._weatherState().current;
    if (_current) return this.normalizeRainData(_current) as CurrentWeatherInfo;
    return undefined;
  });
  readonly hourly = computed(
    () =>
      (this._weatherState()
        .hourly?.map(this.normalizeRainData)
        .slice(0, 10) as HourlyWeatherInfo[]) ?? [],
  );
  readonly daily = computed(
    () =>
      (this._weatherState().daily?.map(this.normalizeRainData).slice(1, 6) as DailyWeatherInfo[]) ??
      [],
  );
  readonly alerts = computed(() => this._weatherState().alerts ?? []);
  readonly currentTime = computed(() => new Date((this.current()?.dt ?? 0) * 1000));

  getAllWeather(lat: number = DEFAULT_LAT, lon: number = DEFAULT_LON): void {
    if (this._cache.isCached(CACHE_KEY)) {
      const cachedData = this._cache.getData(CACHE_KEY) as WeatherResponse;
      if (cachedData.lat === lat && cachedData.lon === lon) {
        this._weatherState.set(cachedData);
        return;
      }
    }

    this._cache.removeData(CACHE_KEY);
    this._loadingService.show();
    this._weatherHttp
      .getAllBy({ lat, lon, lang: 'it', units: this._unitMeasure.selectedUnit() })
      .pipe(finalize(() => this._loadingService.hide()))
      .subscribe({
        next: (response) => {
          this._cache.setData(CACHE_KEY, response);
          this._weatherState.set(response);
        },
      });
  }

  private normalizeRainData(weather: WeatherInfo): WeatherInfo {
    if (weather.rain && typeof weather.rain === 'object')
      weather.rain = Object.values(weather.rain)[0] ?? 0;

    return weather;
  }
}
