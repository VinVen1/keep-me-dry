import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../environments/environment';

export const ApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  req.params.append('appid', environment.openWeatherKey)
  return next(req);
};
