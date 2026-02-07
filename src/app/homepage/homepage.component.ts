import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ForecastComponent } from './components/forecast/forecast.component';
import { WeatherService } from './services/weather.service';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { HourlyWeatherComponent } from './components/hourly-weather/hourly-weather.component';
import { CardComponent } from '@kmd/shared/ui';
import { SearchBarComponent } from '@kmd/shared/ui/search-bar/search-bar.component';

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

  protected forecast = this._weatherService.daily;
  protected current = this._weatherService.current;
  protected hourly = this._weatherService.hourly;

  ngOnInit() {
    this._weatherService.getAllWeather();
  }
}
