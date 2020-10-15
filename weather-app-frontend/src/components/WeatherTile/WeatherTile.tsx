import { useTranslation } from '@hooks/useTranslation';
import { CardContent, CardHeader, Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import React, { CSSProperties, FC, useState } from 'react';
import { Weather } from '../../types/api-types';
import { Typography } from '@components/ui/Typography/Typography';

interface Props {
  weather: Weather;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    margin: 20,
  },
  media: { height: 100, backgroundSize: 'contain' },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

interface DescriptionProps {
  name: string;
  iconName?: string;
  iconRotate?: number;
  value?: string | number;
  unit?: string;
  style?: CSSProperties;
}

const Description: FC<DescriptionProps> = ({ iconName, value, name, unit, iconRotate, style = {} }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '.5rem', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {iconName && (
          <img
            alt={name}
            src={`/icons/${iconName}.svg`}
            width={20}
            style={{ marginRight: '1rem', transform: iconRotate ? `rotate(${iconRotate}deg)` : undefined }}
          />
        )}
        <Typography variant='caption'>{name}</Typography>
      </div>
      {value && <Typography variant='caption'>{`${value}${unit ? ` ${unit}` : ''}`}</Typography>}
    </div>
  );
};

export const WeatherTile: FC<Props> = ({ weather }) => {
  const classes = useStyles();
  const temp = weather?.avgTemp ? Math.round(weather?.avgTemp) : '-';
  const minTemp = weather?.minTemp ? Math.round(weather?.minTemp) : '-';
  const maxTemp = weather?.maxTemp ? Math.round(weather?.maxTemp) : '-';
  const airPressure = weather?.airPressure ? Math.round(weather?.airPressure) : '-';

  return (
    <Card className={classes.root}>
      <CardHeader title={DateTime.fromISO(weather.date).toFormat('cccc')} subheader={weather.city} />
      <CardMedia image={weather.iconUrl} className={classes.media} title={weather.state} />
      <CardHeader title={`${temp}°C`} style={{ textAlign: 'center' }} subheader={weather.state} />
      <CardContent>
        {/* TODO translations */}
        <Description name='Predictability' value={weather.predictability} iconName='percentage' unit='%' />
        <Description name='Air pressure' value={airPressure} iconName='wind' unit='mbar' />
        <Description name='Humidity' value={weather.humidity} iconName='humidity' unit='%' />
        <Description name='Min temperature' value={minTemp} iconName='cold-temperature' unit='°C' />
        <Description name='Max temperature' value={maxTemp} iconName='heat-wave' unit='°C' />
        <Description name='Wind speed' value={Math.round(weather.windSpeed)} iconName='windsock' unit='mph' />
        <Description
          name='Wind direction'
          iconName='arrow-up'
          iconRotate={weather.windDirection}
          value={weather.windDirectionCompass}
          style={{ marginBottom: 0 }}
        />
      </CardContent>
    </Card>
  );
};
