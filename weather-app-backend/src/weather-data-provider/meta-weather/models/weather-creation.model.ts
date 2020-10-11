import { PickType } from '@nestjs/swagger';
import { MetaWeatherEntity } from '../meta-weather.entity';

export class WeatherCreationModel extends PickType(MetaWeatherEntity, [
  'location',
  'date',
  'state',
  'windDirection',
  'windSpeed',
  'airPressure',
  'humidity',
  'predictability',
  'minTemp',
  'maxTemp',
  'avgTemp',
  'iconUrl',
]) {}
