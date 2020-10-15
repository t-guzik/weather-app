import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import cx from 'classnames';
import React, { FC } from 'react';
import style from './Loader.module.scss';

interface Props extends CircularProgressProps {
  fullscreen?: boolean;
}

export const Loader: FC<Props> = ({ fullscreen = false, ...props }) => {
  return (
    <div className={cx(style.overlay, { [style.fullscreen]: fullscreen })}>
      <CircularProgress {...props} />
    </div>
  );
};
