import { DatePicker } from '@components/ui/DatePicker/DatePicker';
import { Typography } from '@components/ui/Typography/Typography';
import { WeatherTile } from '@components/WeatherTile/WeatherTile';
import { useTranslation } from '@hooks/useTranslation';
import { MainLocales } from '@locales/locales.interfaces';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { Weather, FindByCityAndDateDto } from '../../types/api-types';
import { WeatherTileSkeleton } from '@components/WeatherTile/WeatherTileSkeleton';

interface Props {
  date: DateTime;
  maxDate: DateTime;
  minDate: DateTime;
  isLoadingWeather: boolean;
  weather?: Weather;
  onDateChange: (pickerDate: MaterialUiPickersDate) => void;
}

export const DayPage: FC<Props> = ({ weather, isLoadingWeather, maxDate, date, minDate, onDateChange }) => {
  const { t } = useTranslation<MainLocales>('main');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 1.4rem' }}>
        <Typography variant='body1' color='textSecondary'>
          {t('dateInMonth')}
        </Typography>
        <DatePicker
          fullWidth
          name={'date' as keyof FindByCityAndDateDto}
          onChange={onDateChange}
          value={date}
          minDate={minDate}
          maxDate={maxDate}
          size='small'
        />
      </div>
      {isLoadingWeather ? <WeatherTileSkeleton /> : <WeatherTile weather={weather!} />}
    </div>
  );
};
