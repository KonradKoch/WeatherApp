export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: CityInfo;
}

export interface CityInfo {
  coord: Coordinates;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  dt: number;
  dt_txt: string;
  main: WeatherMain;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: SystemInfo;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface SystemInfo {
  pod: string;
}
