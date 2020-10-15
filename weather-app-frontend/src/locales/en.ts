import { ResourceKey } from 'i18next';
import { ErrorsLocales, LocalesInterface, MainLocales } from './locales.interfaces';

export class LocalesEN implements LocalesInterface {
  [namespace: string]: ResourceKey;

  errors: ErrorsLocales = {
    error500text: `An error occurred and your request couldn't be completed. Please try again later.`,
    error404text: 'Page not found',
    goBack: 'Go back',
  };

  main: MainLocales = {
    singleDayForecast: 'Single day forecast',
    fiveDayForecast: '5-day forecast',
    goTo: 'Go to',
    city: 'City...',
    dateInMonth: 'Date in current month',
    noData: 'No data',
  };
}