import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CardComponent} from '../../../../shared/ui';

@Component({
  selector: 'app-current-weather',
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
