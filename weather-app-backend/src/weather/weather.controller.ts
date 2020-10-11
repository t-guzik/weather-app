import { Controller, Get, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { API_RESPONSES } from '../common/constants/api-responses.constants';
import { LogRequest } from '../common/decorators/method/log-request.decorator';
import { Routes } from '../common/enums/routes.enum';
import { WeatherInterface } from '../weather-data-provider/interfaces/weather.interface';
import { FindByCityDto } from './dto/find-by-city.dto';
import { FindByCityAndDateDto } from './dto/find-by-city-and-date.dto';
import { WeatherService } from './weather.service';

@ApiTags(Routes.WEATHER)
@Controller(Routes.WEATHER)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @LogRequest()
  @Get('forecast')
  @ApiNotFoundResponse(API_RESPONSES.NOT_FOUND)
  @ApiInternalServerErrorResponse(API_RESPONSES.INTERNAL_SERVER_ERROR)
  findWeatherForecast(@Query() { city }: FindByCityDto): Promise<WeatherInterface[]> {
    return this.weatherService.findWeatherForecast(city);
  }

  @LogRequest()
  @Get('day-in-month')
  @ApiNotFoundResponse(API_RESPONSES.NOT_FOUND)
  @ApiInternalServerErrorResponse(API_RESPONSES.INTERNAL_SERVER_ERROR)
  findWeatherByDay(@Query() { city, date }: FindByCityAndDateDto): Promise<WeatherInterface> {
    return this.weatherService.findWeatherByDay(city, date);
  }
}
