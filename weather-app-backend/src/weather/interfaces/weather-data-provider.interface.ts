import { DateTime } from 'luxon';
import { WeatherInterface } from '../../weather-data-provider/interfaces/weather.interface';

export interface WeatherDataProviderInterface {
  getWeatherForecastForCity(city: string): Promise<WeatherInterface[] | null>;
  getWeatherForCityByDate(city: string, date: DateTime): Promise<WeatherInterface | null>;
}
