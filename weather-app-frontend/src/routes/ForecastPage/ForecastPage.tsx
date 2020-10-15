import { WeatherTile } from '@components/WeatherTile/WeatherTile';
import { WeatherTileSkeleton } from '@components/WeatherTile/WeatherTileSkeleton';
import React, { FC } from 'react';
import { FORECAST_DAYS } from '../../constants/common.constants';
import { Weather } from '../../types/api-types';

interface Props {
  isLoadingWeather: boolean;
  weatherArray?: Weather[];
}

export const ForecastPage: FC<Props> = ({ weatherArray, isLoadingWeather }) => {
  const weatherTiles = weatherArray?.slice(0, FORECAST_DAYS).map(w => <WeatherTile weather={w} key={w.date} />);
  const weatherTileSkeletons = Array.apply(null, Array(FORECAST_DAYS)).map((_, i) => <WeatherTileSkeleton key={i} />);

  return <>{isLoadingWeather ? weatherTileSkeletons : weatherTiles}</>;
};
