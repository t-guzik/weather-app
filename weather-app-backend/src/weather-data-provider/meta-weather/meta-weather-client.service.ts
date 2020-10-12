import { HttpService, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { DataProviderFetchError } from '../errors/data-provider-fetch.error';
import { WeatherStateEnum } from './enums/weather-state.enum';
import { ConsolidatedWeather } from './interfaces/consolidated-weather.interface';
import { LocationSearch } from './interfaces/location.search';
import { LocationWeather } from './interfaces/location.weather';

@Injectable()
export class MetaWeatherClientService {
  constructor(private readonly metaWeatherClient: HttpService) {}

  async fetchWeatherForecastForCity(city: string): Promise<LocationWeather | null> {
    const locationSearchResult = await this.fetchLocationByCity(city);
    if (!locationSearchResult) {
      return null;
    }

    return this.fetchWeatherForecastByLocation(locationSearchResult);
  }

  async fetchWeatherForCityByDate(city: string, date: DateTime): Promise<ConsolidatedWeather | null> {
    const locationSearchResult = await this.fetchLocationByCity(city);
    if (!locationSearchResult) {
      return null;
    }

    return this.fetchWeatherForDayByLocation(locationSearchResult, date);
  }

  getWeatherStateIconUrl(state: WeatherStateEnum): string {
    return `https://www.metaweather.com/static/img/weather/${state}.svg`;
  }

  /**
   * 5 days forecast
   * @param woeid
   * @private
   */
  private async fetchWeatherForecastByLocation({ woeid }: LocationSearch): Promise<LocationWeather> {
    try {
      const { data } = await this.metaWeatherClient.get<LocationWeather>(`location/${woeid}`).toPromise();

      return data;
    } catch (error) {
      throw new DataProviderFetchError('Getting weather for city error', { error });
    }
  }

  private async fetchWeatherForDayByLocation({ woeid }: LocationSearch, { year, month, day }: DateTime): Promise<ConsolidatedWeather | null> {
    try {
      const { data } = await this.metaWeatherClient.get<ConsolidatedWeather[]>(`location/${woeid}/${year}/${month}/${day}`).toPromise();
      const exists = data && data[0];

      return exists ? data[0] : null; // take first element for simplicity
    } catch (error) {
      throw new DataProviderFetchError('Getting weather for city error', { error });
    }
  }

  private async fetchLocationByCity(city: string): Promise<LocationSearch | null> {
    try {
      const { data } = await this.metaWeatherClient
        .get<LocationSearch[]>('location/search', { params: { query: city } })
        .toPromise();
      const exists = data && data[0];

      return exists ? data[0] : null;
    } catch (error) {
      throw new DataProviderFetchError('Getting city location error', { city, error });
    }
  }
}
