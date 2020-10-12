import { MetaWeather } from '../meta-weather.entity';

export type MetaWeatherCreation = Pick<
  MetaWeather,
  | 'location'
  | 'date'
  | 'state'
  | 'windDirection'
  | 'windSpeed'
  | 'airPressure'
  | 'humidity'
  | 'predictability'
  | 'minTemp'
  | 'maxTemp'
  | 'avgTemp'
  | 'iconUrl'
> &
  Partial<Pick<MetaWeather, 'updatedAt'>>;
