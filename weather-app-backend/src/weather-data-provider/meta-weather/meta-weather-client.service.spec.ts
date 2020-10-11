import { Test, TestingModule } from '@nestjs/testing';
import { MetaWeatherClientService } from './meta-weather-client.service';

describe('WeatherDataProviderService', () => {
  let service: MetaWeatherClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaWeatherClientService],
    }).compile();

    service = module.get<MetaWeatherClientService>(MetaWeatherClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
