
/**
 * Represents the response object for weather data.
 * Contains detailed information about current, hourly, daily, and minute-level weather forecasts,
 * timezone information, and weather alerts for the requested location.
 */
export interface WeatherResponse {
  /**
   Latitude, decimal (-90; 90)
   */
  lat: number
  /**
   * Longitude, decimal (-180; 180).
   */
  lon: number
  /**
   * Timezone name for the requested location
   */
  timezone: string
  /**
   * Shift in seconds from UTC
   */
  timezone_offset: number
  /**
   *  Current weather data API response
   */
  current?: CurrentWeatherInfo;
  /**
   * Hourly forecast weather data API response
   */
  hourly?: HourlyWeatherInfo[];
  /**
   *  Minute forecast weather data API response
   */
  minutely?: MinutelyWeatherInfo[];
  /**
   * Daily forecast weather data API response
   */
  daily?: DailyWeatherInfo[];
  /**
   * National weather alerts data from major national weather warning systems
   */
  alerts?: Alert[];
}

export interface WeatherInfo {
  /**
   * Current time or time of forecasted data (Hours, Days)
   */
  dt: number;
  temp: number | DailyTemp;
  feels_like: number | DailyTemp;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
}

export interface Weather {
  id: string;
  main: string;
  description: string;
  icon: WeatherIcons;
}

export interface CurrentWeatherInfo extends WeatherInfo {
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
}

export interface MinutelyWeatherInfo {
  /**
   *  Minute forecast weather data API response
   */
  dt: number;
  precipitation: number;
}

export interface HourlyWeatherInfo extends WeatherInfo {
  pop: number;
  temp: number;
  feels_like: number;
}

export interface DailyWeatherInfo extends WeatherInfo {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: DailyTemp;
  feels_like: DailyTemp;

}

export interface DailyTemp {
  day: number;
  min?: number;
  max?: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export type WeatherIcons = '01n' | '02n' | '03n' | '04n' | '09n' | '10n' | '11n' | '13n' | '50n' |'01d' | '02d' | '03d' | '04d' | '09d' | '10d' | '11d' | '13d' | '50d'
