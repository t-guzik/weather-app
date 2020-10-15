import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Environment } from '@enums/environment.enum';
import { Language } from '@enums/language.enum';
import { LocalesEN } from './en';

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === Environment.Development;

// tslint:disable-next-line:no-async-without-await, no-floating-promises
(async () =>
  i18n.use(initReactI18next).init({
    resources: { en: new LocalesEN() },
    fallbackLng: Language.EN,
    debug: isDevelopment,
  }))();
