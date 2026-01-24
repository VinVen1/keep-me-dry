export interface WeatherResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: CurrentWeatherInfo;
  hourly: HourlyWeatherInfo[];
  minutely: MinutelyWeatherInfo[];
  daily: DailyWeatherInfo[];
  alerts: Alert[];
}

export interface WeatherInfo {
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
  icon: string;
}

export interface CurrentWeatherInfo extends WeatherInfo {
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
}

export interface MinutelyWeatherInfo {
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


