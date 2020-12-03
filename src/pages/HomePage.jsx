import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import StoresLocationMap from './StoresLocationMap';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow : 'hidden',
  },
}));


export default function HomePage(props) {
  const classes = useStyles();

    return (
      <Grid className={classes.root}>
          <StoresLocationMap />
      </Grid>
    );
  }


