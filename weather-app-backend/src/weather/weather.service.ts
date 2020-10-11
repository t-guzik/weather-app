import { Inject, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { WeatherInterface } from '../weather-data-provider/interfaces/weather.interface';
import { WeatherNotFoundError } from './errors/weather-not-found.error';
import { WeatherDataProviderInterface } from './interfaces/weather-data-provider.interface';

@Injectable()
export class WeatherService {
  constructor(@Inject('WEATHER_DATA_PROVIDER') private readonly weatherDataProvider: WeatherDataProviderInterface) {}

  async findWeatherForecast(city: string): Promise<WeatherInterface[]> {
    const weatherData = await this.weatherDataProvider.getWeatherForecastForCity(city);
    if (!weatherData) {
      throw new WeatherNotFoundError({ city });
    }

    return weatherData;
  }

  async findWeatherByDay(city: string, date: DateTime): Promise<WeatherInterface> {
    const weatherData = await this.weatherDataProvider.getWeatherForCityByDate(city, date);
    if (!weatherData) {
      throw new WeatherNotFoundError({ city, date: date.toString() });
    }

    return weatherData;
  }
}
