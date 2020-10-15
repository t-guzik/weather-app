import cx from 'classnames';
import React, { CSSProperties, FC } from 'react';
import styles from './Box.module.scss';
import { Paper } from '@material-ui/core';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export const Box: FC<Props> = ({ children, className, style }) => {
  return (
    <Paper className={cx(styles.box, className)} style={style}>
      {children}
    </Paper>
  );
};
