import { Component } from '@angular/core';
import {NgOptimizedImage, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-weather-info',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './weather-info.html',
  styleUrl: './weather-info.scss',
})
export class WeatherInfo {

}
