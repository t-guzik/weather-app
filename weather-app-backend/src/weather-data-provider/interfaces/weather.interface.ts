export interface WeatherInterface {
  location: string;
  date: string;
  state?: string;
  windDirection?: number;
  windSpeed?: number;
  airPressure?: number;
  humidity?: number;
  predictability?: number;
  minTemp?: number;
  maxTemp?: number;
  avgTemp?: number;
  iconUrl?: string;
}
