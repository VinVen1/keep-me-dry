import { Component } from '@angular/core';
import {WeatherInfo} from './components/weather-info/weather-info';

@Component({
  selector: 'app-homepage',
  imports: [
    WeatherInfo
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {

}
