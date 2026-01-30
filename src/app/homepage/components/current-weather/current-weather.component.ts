import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CardComponent} from '@kmd/shared/ui';

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

}
