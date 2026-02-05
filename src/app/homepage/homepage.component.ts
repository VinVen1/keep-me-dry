import {ChangeDetectionStrategy, Component, effect, inject, OnInit} from '@angular/core';
import {ForecastComponent} from './components/forecast/forecast.component';
import {WeatherService} from './services/weather.service';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {HourlyWeatherComponent} from './components/hourly-weather/hourly-weather.component';
import {CardComponent} from '@kmd/shared/ui';

@Component({
  selector: 'kmd-homepage',
  imports: [
    ForecastComponent,
    CurrentWeatherComponent,
    HourlyWeatherComponent,
    CardComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit{
  private readonly _weatherService = inject(WeatherService);

  protected forecast = this._weatherService.daily;
  protected current = this._weatherService.current;
  protected hourly = this._weatherService.hourly;

  constructor() {
    effect(() => {
      this.current()?.weather[0].icon
    });
  }

  ngOnInit() {
    this._weatherService.getAllWeather();
  }

}
