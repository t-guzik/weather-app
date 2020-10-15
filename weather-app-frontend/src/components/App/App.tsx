import { TopBar } from '@components/TopBar/TopBar';
import React, { FC } from 'react';
import style from './App.module.scss';
import { Routes } from '@routes/Routes';

export const App: FC = () => {
  return (
    <div className={style.container}>
      <TopBar />
      <div style={{ padding: '2rem 5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Routes />
        </div>
      </div>
    </div>
  );
};
