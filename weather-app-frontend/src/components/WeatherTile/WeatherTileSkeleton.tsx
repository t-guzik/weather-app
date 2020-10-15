import { CardContent, CardHeader, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { Weather } from '../../types/api-types';
import { Skeleton } from '@material-ui/lab';

interface Props {
  weather?: Weather;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    margin: 20,
  },
  media: { height: 100, width: 100, backgroundSize: 'contain' },
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

export const WeatherTileSkeleton: FC<Props> = () => {
  const classes = useStyles();
  const descriptions = Array.apply(null, Array(7)).map((_, i) => (
    <Skeleton animation='wave' height={20} width='100%' style={{ marginBottom: '0.5rem' }} key={i} />
  ));

  return (
    <Card className={classes.root}>
      <CardHeader title={<Skeleton animation='wave' height={32} width='50%' />} subheader={<Skeleton animation='wave' height={24} width='20%' />} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <Skeleton animation='wave' variant='rect' width={100} height={100} style={{ marginBottom: '1rem' }} />
        <Skeleton animation='wave' height={32} width={50} />
        <Skeleton animation='wave' height={24} width={80} style={{ marginBottom: '1rem' }} />
      </div>
      <CardContent>{descriptions}</CardContent>
    </Card>
  );
};
