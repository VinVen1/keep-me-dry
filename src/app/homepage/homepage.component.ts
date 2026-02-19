import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ForecastComponent } from './components/forecast/forecast.component';
import { WeatherService } from './services/weather.service';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { HourlyWeatherComponent } from './components/hourly-weather/hourly-weather.component';
import { CardComponent } from '@kmd/shared/ui';
import { SearchBarComponent } from '@kmd/shared/ui/search-bar/search-bar.component';
import { LocalitiesService } from './services/localities.service';
import { Language } from '@kmd/shared/interfaces';

@Component({
  selector: 'kmd-homepage',
  imports: [
    ForecastComponent,
    CurrentWeatherComponent,
    HourlyWeatherComponent,
    CardComponent,
    SearchBarComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  private readonly _weatherService = inject(WeatherService);
  private readonly _localitiesService = inject(LocalitiesService);

  protected forecast = this._weatherService.daily;
  protected current = this._weatherService.current;
  protected hourly = this._weatherService.hourly;
  protected localitiesLoading = this._localitiesService.isLoading;
  protected localities = this._localitiesService.localities;
  protected currentLocality = signal('');

  ngOnInit() {
    this._localitiesService.getLocalityFromCurrentPosition().subscribe({
      next: (value) => this._weatherService.getAllWeather(value[0].lat, value[0].lon),
      error: (err) => {
        this._weatherService.getAllWeather();
        console.warn(err);
      },
    });
  }

  searchLocalities(locality: string) {
    this._localitiesService.getLocalities(locality);
  }

  localitySelect(coords: { lat: number; lon: number }) {
    this._weatherService.getAllWeather(coords.lat, coords.lon);
  }

  changeLang(lang: Language) {
    console.log(lang);
  }
}
