import { HttpService, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { DataProviderFetchError } from '../errors/data-provider-fetch.error';
import { WeatherStateEnum } from './enums/weather-state.enum';
import { ConsolidatedWeatherInterface } from './interfaces/consolidated-weather.interface';
import { LocationSearchInterface } from './interfaces/location-search.interface';
import { LocationWeatherInterface } from './interfaces/location-weather.interface';

@Injectable()
export class MetaWeatherClientService {
  constructor(private readonly metaWeatherClient: HttpService) {}

  async fetchWeatherForecastForCity(city: string): Promise<LocationWeatherInterface | null> {
    const locationSearchResult = await this.fetchLocationByCity(city);
    if (!locationSearchResult) {
      return null;
    }

    return this.fetchWeatherForecastByLocation(locationSearchResult);
  }

  async fetchWeatherForCityByDate(city: string, date: DateTime): Promise<ConsolidatedWeatherInterface | null> {
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
  private async fetchWeatherForecastByLocation({ woeid }: LocationSearchInterface): Promise<LocationWeatherInterface> {
    try {
      const { data } = await this.metaWeatherClient.get<LocationWeatherInterface>(`location/${woeid}`).toPromise();

      return data;
    } catch (error) {
      throw new DataProviderFetchError('Getting weather for city error', { error });
    }
  }

  private async fetchWeatherForDayByLocation(
    { woeid }: LocationSearchInterface,
    { year, month, day }: DateTime,
  ): Promise<ConsolidatedWeatherInterface | null> {
    try {
      const { data } = await this.metaWeatherClient.get<ConsolidatedWeatherInterface[]>(`location/${woeid}/${year}/${month}/${day}`).toPromise();
      const exists = data && data[0];

      return exists ? data[0] : null; // take first element for simplicity
    } catch (error) {
      throw new DataProviderFetchError('Getting weather for city error', { error });
    }
  }

  private async fetchLocationByCity(city: string): Promise<LocationSearchInterface | null> {
    try {
      const { data } = await this.metaWeatherClient
        .get<LocationSearchInterface[]>('location/search', { params: { query: city } })
        .toPromise();
      const exists = data && data[0];

      return exists ? data[0] : null;
    } catch (error) {
      throw new DataProviderFetchError('Getting city location error', { city, error });
    }
  }
}
