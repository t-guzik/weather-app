import { Path } from '@enums/path.enum';
import { useTranslation } from '@hooks/useTranslation';
import { FormControlLabel, Switch } from '@material-ui/core'; // TODO move to ui
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { store } from '@store/store';
import { StoreActionType } from '@store/store-types';
import React, { ChangeEvent, FC, useContext, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

export const TopBar: FC = () => {
  const { t } = useTranslation('main');
  const { state, dispatch } = useContext(store);
  const { push, location } = useHistory();
  const classes = useStyles();

  const handleCityChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: StoreActionType.SET_CITY, payload: target.value });
  };

  const [switchChecked, setSwitchChecked] = useState(location.pathname.startsWith(Path.FORECAST));
  const handleSwitch = (_event: any, checked: boolean) => {
    setSwitchChecked(checked);
    push(checked ? Path.FORECAST : Path.DAY);
  };

  const redirectButtonText = switchChecked ? t('fiveDayForecast') : t('singleDayForecast');

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h5' noWrap>
            Weather App
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='subtitle2' noWrap>
              {redirectButtonText}
            </Typography>
            <Switch
              checked={switchChecked}
              className={classes.menuButton}
              onChange={handleSwitch}
              color='secondary'
              inputProps={{ 'aria-label': 'view switch' }}
            />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={t('city')}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={state.city}
              onChange={handleCityChange}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
