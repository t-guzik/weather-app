import { ErrorBoundary } from '@components/Errors/ErrorBoundary';
import React, { FC } from 'react';
import { App } from './App';
import './App.module.scss';

export const AppContainer: FC = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};
