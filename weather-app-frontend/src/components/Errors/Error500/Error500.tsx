import { useTranslation } from '@hooks/useTranslation';
import { ErrorsLocales } from '@locales/locales.interfaces';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatus } from '@enums/http-status.enum';
import { Box } from '@components/ui/Box/Box';
import { Button } from '@components/ui/Button/Button';
import style from './Error500.module.scss';

export const Error500 = () => {
  const { goBack } = useHistory();
  const { t } = useTranslation<ErrorsLocales>('errors');

  return (
    <main className={style.container}>
      <Box>
        <h1>{HttpStatus.INTERNAL_SERVER_ERROR}</h1>
        <p>{t('error500text')}</p>
        <Button onClick={goBack}>{t('goBack')}</Button>
      </Box>
    </main>
  );
};
