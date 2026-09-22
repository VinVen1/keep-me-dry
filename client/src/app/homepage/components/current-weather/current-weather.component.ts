import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { CurrentWeatherInfo, DailyWeatherInfo } from '@kmd/shared/interfaces/weather';
import { UnitMeasurePipe } from '@kmd/shared/pipes/unit-measure-pipe';
import { WeatherIconMap } from '@kmd/shared/utils/weather-imgs';
import { WeatherIconPipe } from '@kmd/shared/pipes/weather-icon-pipe';

@Component({
  selector: 'kmd-current-weather',
  imports: [NgOptimizedImage, UnitMeasurePipe, WeatherIconPipe, TitleCasePipe, DatePipe],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  currentWeather = input.required<CurrentWeatherInfo | undefined>();
  daily = input.required<DailyWeatherInfo | undefined>();
  readonly now = new Date();
  locality = input.required<string>();
  weatherImage = computed(() => {
    const current = this.currentWeather();
    if (current?.weather) return WeatherIconMap[current.weather[0].icon];
    return 'default';
  });
}
