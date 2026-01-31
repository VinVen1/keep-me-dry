import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ForecastComponent} from './components/forecast/forecast.component';
import {WeatherService} from './services/weather.service';

@Component({
  selector: 'kmd-homepage',
  imports: [
    ForecastComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  private readonly _weatherService = inject(WeatherService);

  protected forecast = this._weatherService.daily;
  protected current = this._weatherService.current;
  protected hourly = this._weatherService.hourly;

}
