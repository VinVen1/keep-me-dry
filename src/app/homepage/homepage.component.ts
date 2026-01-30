import {Component} from '@angular/core';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {HourlyWeatherComponent} from './components/hourly-weather/hourly-weather.component';
import {ForecastComponent} from './components/forecast/forecast.component';
import {FORECAST_MOCK} from '@kmd/shared/mock/forecast';

@Component({
  selector: 'kmd-homepage',
  imports: [
    CurrentWeatherComponent,
    HourlyWeatherComponent,
    ForecastComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {

forecast = FORECAST_MOCK
}
