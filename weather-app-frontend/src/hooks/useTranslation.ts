import { useTranslation as i18useTranslation } from 'react-i18next';
import { LocalesInterface, MainLocales } from '@locales/locales.interfaces';

export const useTranslation: <T = MainLocales>(ns: keyof LocalesInterface) => { t: (key: keyof T, options?: any) => string } = ns =>
  i18useTranslation(ns as string);
