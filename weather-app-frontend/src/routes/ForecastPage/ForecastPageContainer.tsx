import { NoData } from '@components/ui/NoData/NoData';
import { ForecastPage } from '@routes/ForecastPage/ForecastPage';
import { useForecastWeatherData } from '@routes/ForecastPage/hooks/useForecastWeatherData';
import { store } from '@store/store';
import React, { FC, useContext } from 'react';
import { useDebounce } from 'use-debounce';
import { DEBOUNCE_TIME_MS } from '../../constants/common.constants';

export const ForecastPageContainer: FC = () => {
  const { state } = useContext(store);
  const [debouncedCity] = useDebounce(state.city, DEBOUNCE_TIME_MS);
  const { isLoadingWeather, weatherArray, isError } = useForecastWeatherData({ city: debouncedCity });

  if (isError) {
    return <NoData />;
  }

  return <ForecastPage weatherArray={weatherArray} isLoadingWeather={isLoadingWeather} />;
};
