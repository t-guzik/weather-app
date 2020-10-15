import { Box } from '@components/ui/Box/Box';
import { Typography } from '@components/ui/Typography/Typography';
import { useTranslation } from '@hooks/useTranslation';
import React from 'react';

export const NoData = () => {
  const { t } = useTranslation('main');

  return (
    <Box style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem' }}>
      <img alt='no-data' src={`/icons/no-data.svg`} width={100} style={{ marginBottom: '1rem' }} />
      <Typography variant='h5'>{t('noData')}</Typography>
    </Box>
  );
};
