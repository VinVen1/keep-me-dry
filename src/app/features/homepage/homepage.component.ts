import { Component } from '@angular/core';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {HourlyWeatherComponent} from './components/hourly-weather/hourly-weather.component';

@Component({
  selector: 'app-homepage',
  imports: [
    CurrentWeatherComponent,
    HourlyWeatherComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {

}
