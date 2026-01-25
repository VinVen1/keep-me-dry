import { Component } from '@angular/core';
import {CardComponent} from '../../../../shared/ui';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-hourly-weather',
  imports: [
    CardComponent,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './hourly-weather.component.html',
  styleUrl: './hourly-weather.component.scss',
})
export class HourlyWeatherComponent {

}
