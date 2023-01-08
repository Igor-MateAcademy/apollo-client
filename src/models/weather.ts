export interface WindData {
  speed: number;
  gust: number;
}

export interface WeatherAtCurrentPoint {
  id: number;
  main: string;
  description: string;
}

export interface ForecastData {
  name: string;
  date: moment.Moment;
  humidity: number;
  temperature: number;
  mode: 'n' | 'd';
  wind: WindData;
  clouds: number;
  weather: WeatherAtCurrentPoint;
  visibility: number;
}
