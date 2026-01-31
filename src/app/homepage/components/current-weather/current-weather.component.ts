import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CardComponent} from '@kmd/shared/ui';
import {CurrentWeatherInfo} from '@kmd/shared/interfaces/weather';

@Component({
  selector: 'kmd-current-weather',
  imports: [
    NgOptimizedImage,
    CardComponent
  ],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent {
  currentWeather = input.required<CurrentWeatherInfo>()
}
