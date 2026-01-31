import {Component, input} from '@angular/core';
import {CardComponent} from '@kmd/shared/ui';
import {NgOptimizedImage} from '@angular/common';
import {HourlyWeatherInfo} from '@kmd/shared/interfaces/weather';

@Component({
  selector: 'kmd-hourly-weather',
  imports: [
    CardComponent,
    NgOptimizedImage
  ],
  templateUrl: './hourly-weather.component.html',
  styleUrl: './hourly-weather.component.scss',
})
export class HourlyWeatherComponent {
  hourlyData = input.required<HourlyWeatherInfo>();
}
