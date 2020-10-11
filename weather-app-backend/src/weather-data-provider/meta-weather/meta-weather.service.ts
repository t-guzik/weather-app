import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { nowUTC } from '../../common/utils/date.util';
import { ConfigService } from '../../config/config.service';
import { WeatherDataProviderInterface } from '../../weather/interfaces/weather-data-provider.interface';
import { WeatherInterface } from '../interfaces/weather.interface';
import { MetaWeatherClientService } from './meta-weather-client.service';
import { MetaWeatherEntity } from './meta-weather.entity';

@Injectable()
export class MetaWeatherService implements WeatherDataProviderInterface {
  constructor(
    @InjectRepository(MetaWeatherEntity) readonly repository: Repository<MetaWeatherEntity>,
    private readonly clientService: MetaWeatherClientService,
    private readonly configService: ConfigService,
  ) {}

  async getWeatherForCityByDate(city: string, date: DateTime): Promise<WeatherInterface | null> {
    const { cacheTtlMs } = this.configService.getWeatherApiConfig();
    const maxValidCacheUTCDate = nowUTC().minus({ milliseconds: cacheTtlMs }).toSQL();

    const cachedData = await this.repository.findOne({
      where: {
        location: city.toLowerCase(),
        date: date.toSQLDate(),
        updatedAt: MoreThanOrEqual(maxValidCacheUTCDate),
      },
    });

    if (cachedData) {
      return cachedData;
    }

    const weatherData = await this.clientService.fetchWeatherForCityByDate(city, date);
    if (!weatherData) {
      return null;
    }

    const saved = await this.repository.save({
      location: city.toLowerCase(),
      date: weatherData.applicable_date,
      state: weatherData.weather_state_name,
      windDirection: weatherData.wind_direction,
      windSpeed: weatherData.wind_speed,
      airPressure: weatherData.air_pressure,
      humidity: weatherData.humidity,
      predictability: weatherData.predictability,
      minTemp: weatherData.min_temp,
      maxTemp: weatherData.max_temp,
      avgTemp: weatherData.the_temp,
      iconUrl: this.clientService.getWeatherStateIconUrl(weatherData.weather_state_abbr),
    });

    // TODO update cache/db

    return saved;
  }

  async getWeatherForecastForCity(city: string): Promise<WeatherInterface[] | null> {
    const { cacheTtlMs } = this.configService.getWeatherApiConfig();
    const startUTCDate = nowUTC().startOf('day').minus({ day: 1 }).toSQL();
    const endUTCDate = nowUTC().startOf('day').plus({ days: 4 }).toSQL();
    const maxValidCacheUTCDate = nowUTC().minus({ milliseconds: cacheTtlMs }).toSQL();

    const cachedData = await this.repository.find({
      where: {
        location: city.toLowerCase(),
        date: Between(startUTCDate, endUTCDate),
        updatedAt: MoreThanOrEqual(maxValidCacheUTCDate),
      },
    });

    if (cachedData.length === 5) {
      return cachedData;
    }

    const weatherData = await this.clientService.fetchWeatherForecastForCity(city);
    if (!weatherData) {
      return null;
    }

    const entities = weatherData.consolidated_weather.map(cw => ({
      location: city.toLowerCase(),
      date: cw.applicable_date,
      state: cw.weather_state_name,
      windDirection: cw.wind_direction,
      windSpeed: cw.wind_speed,
      airPressure: cw.air_pressure,
      humidity: cw.humidity,
      predictability: cw.predictability,
      minTemp: cw.min_temp,
      maxTemp: cw.max_temp,
      avgTemp: cw.the_temp,
      iconUrl: this.clientService.getWeatherStateIconUrl(cw.weather_state_abbr),
    }));

    const saved = await this.repository.save(entities);

    // TODO update cache/db

    return saved.slice(0, 5);
  }
}
