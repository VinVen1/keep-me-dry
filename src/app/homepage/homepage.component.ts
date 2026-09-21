import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ForecastComponent } from './components/forecast/forecast.component';
import { WeatherService } from './services/weather.service';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { HourlyWeatherComponent } from './components/hourly-weather/hourly-weather.component';
import { CardComponent } from '@kmd/shared/ui';
import { SearchBarComponent } from '@kmd/shared/ui/search-bar/search-bar.component';
import { LocalitiesService } from './services/localities.service';
import { Geolocation, Language } from '@kmd/shared/interfaces';

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
  protected currentLocality = computed(() => {
    const locality = this._localitiesService.currentLocality();
    const locName = locality.local_names ? locality.local_names['it'] : locality.name;
    return `${locName}, ${locality.state ?? ''}`;
  });

  ngOnInit() {
    this._localitiesService.getLocalityFromCurrentPosition().subscribe({
      next: (value) => this._weatherService.getAllWeather(value.lat, value.lon),
      error: (err) => {
        this._weatherService.getAllWeather();
        console.warn(err);
      },
    });
  }

  searchLocalities(localityName: string) {
    this._localitiesService.getLocalities(localityName);
  }

  localitySelect(locality: Geolocation) {
    this._localitiesService.setCurrentLocality(locality);
    this._weatherService.getAllWeather(locality.lat, locality.lon);
  }

  changeLang(lang: Language) {
    console.log(lang);
  }
}
