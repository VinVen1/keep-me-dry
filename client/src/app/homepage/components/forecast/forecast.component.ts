import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DailyWeatherInfo } from '@kmd/shared/interfaces/weather/weather.interface';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { UnitMeasurePipe } from '@kmd/shared/pipes/unit-measure-pipe';
import { WeatherIconPipe } from '@kmd/shared/pipes/weather-icon-pipe';

@Component({
  selector: 'kmd-forecast',
  imports: [NgOptimizedImage, UnitMeasurePipe, DatePipe, WeatherIconPipe],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent {
  forecastInfo = input.required<DailyWeatherInfo[]>();
}
