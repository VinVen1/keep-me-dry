import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * ApiKeyInterceptor is an HTTP interceptor function that appends an OpenWeather API key
 * (stored in the environment configuration) to the request's query parameters.
 * It is specifically used for appending the 'appid' parameter required for
 * authenticated API requests.
 *
 * This interceptor ensures each outgoing request has the necessary
 * authentication parameter added within the query string.
 *
 * The function intercepts the request, modifies it by appending the 'appid'
 * parameter with the value of `environment.openWeatherKey`, and forwards the
 * modified request to the next handler in the HTTP pipeline.
 *
 *
 * @param {HttpRequest} req The outgoing HTTP request.
 * @param {HttpHandler} next The next handler in the HTTP request pipeline.
 * @returns {Observable<HttpEvent>} The observable resulting from the modified HTTP request.
 */
export const ApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  req.params.append('appid', environment.openWeatherKey)
  return next(req);
};
