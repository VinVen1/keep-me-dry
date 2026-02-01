import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CardComponent} from '@kmd/shared/ui';
import {CurrentWeatherInfo} from '@kmd/shared/interfaces/weather';
import {UnitMeasurePipe} from '@kmd/shared/pipes/unit-measure-pipe';
import {WeatherIconMap} from '@kmd/shared/utils/weather-imgs';
import {WeatherIconPipe} from '@kmd/shared/pipes/weather-icon-pipe';

@Component({
  selector: 'kmd-current-weather',
  imports: [
    NgOptimizedImage,
    CardComponent,
    UnitMeasurePipe,
    WeatherIconPipe,
  ],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent {
  currentWeather = input.required<CurrentWeatherInfo | undefined>()
  weatherImage = computed(() => {
    const current = this.currentWeather()
    if (current?.weather)
      return WeatherIconMap[current.weather[0].icon]
    return 'default'
  })

}
