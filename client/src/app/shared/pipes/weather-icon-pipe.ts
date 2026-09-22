import { Pipe, PipeTransform } from '@angular/core';
import { WeatherIcons } from '@kmd/shared/interfaces/weather';
import { WeatherIconMap } from '@kmd/shared/utils/weather-imgs';

@Pipe({
  name: 'weatherIcon',
})
export class WeatherIconPipe implements PipeTransform {
  transform(value: WeatherIcons | undefined): string {
    if (value) return '/assets/img/weather/' + WeatherIconMap[value] + '.png';

    return '/assets/img/weather/404.png';
  }
}
