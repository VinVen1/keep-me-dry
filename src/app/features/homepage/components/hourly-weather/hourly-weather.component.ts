import {Component} from '@angular/core';
import {CardComponent} from '@kmd/shared/ui';
import {NgOptimizedImage} from '@angular/common';

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

}
