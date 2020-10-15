import { ResourceLanguage } from 'i18next';

export interface LocalesInterface extends ResourceLanguage {
  main: MainLocales;
  errors: ErrorsLocales;
}

export interface ErrorsLocales {
  error404text: string;
  error500text: string;
  goBack: string;
}

export interface MainLocales {
  singleDayForecast: string;
  fiveDayForecast: string;
  goTo: string;
  city: string;
  dateInMonth: string;
  noData: string;
}
