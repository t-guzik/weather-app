import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';
import { MetaWeatherClientService } from './meta-weather-client.service';
import { MetaWeatherEntity } from './meta-weather.entity';
import { MetaWeatherService } from './meta-weather.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetaWeatherEntity]),
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const { url } = configService.getWeatherApiConfig();

        return { baseURL: url };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MetaWeatherClientService, { provide: 'WEATHER_DATA_PROVIDER', useClass: MetaWeatherService }],
  exports: ['WEATHER_DATA_PROVIDER'],
})
export class MetaWeatherModule {}
