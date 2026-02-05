import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {DatePipe, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {HourlyWeatherInfo} from '@kmd/shared/interfaces/weather';
import {WeatherIconPipe} from '@kmd/shared/pipes';

@Component({
  selector: 'kmd-hourly-weather',
  imports: [
    NgOptimizedImage,
    DatePipe,
    WeatherIconPipe,
    TitleCasePipe
  ],
  templateUrl: './hourly-weather.component.html',
  styleUrl: './hourly-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourlyWeatherComponent {
  hourlyData = input.required<HourlyWeatherInfo[]>();
}
