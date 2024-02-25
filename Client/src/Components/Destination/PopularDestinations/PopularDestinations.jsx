import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles.js';
import PopularDestinationCard from '../PopularDestinationCard/PopularDestinationCard.jsx';
import { Skeleton } from '@mui/material';
import { getTopDestinations } from '../../../actions/destinations.js';
import PropTypes from 'prop-types';
import SecondaryButton from '../../Button/SecondaryButton.jsx';
import ArrowRight from '../../../assets/icons/ArrowRight.jsx';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PopularDestinations({ setCurrentId }) {
  const { destinations, isLoadingDestinations } = useSelector((state) => state.destinations);
  console.log('Received  in compoenent :', destinations);
  const value = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log('recieved ', destinations, value);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getTopDestinations());
  }, []);

  if (!isLoadingDestinations && !destinations?.length) {
    return <div>No Destinations</div>;
  }
  console.log('test');
  return (
    <Grid container className={classes.root}>
      <Grid
        style={{
          alignSelf: 'start',
          paddingTop: '3em',
          paddingBottom: '3em',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        spacing={3}>
        <Grid style={{ alignSelf: 'start' }} spacing={3}>
          <Typography className={classes.Title}>Popular Destiantions</Typography>
        </Grid>
        <Link to="/destinations" style={{ textDecoration: 'none' }}>
          <SecondaryButton content={'View all'} icon={ArrowRight} />
        </Link>
      </Grid>
      <div className={classes.mainContainer}>
        {isLoadingDestinations ? (
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((item, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Box sx={{ width: '100%', my: 5 }}>
                  <Skeleton variant="rounded" width={'40%'} height={100} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width="20%" />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3} justifyContent="center" className={classes.Container}>
            {destinations?.map((destination) => (
              <Grid key={destination._id} item xs={12} sm={6} md={2} lg={2}>
                <PopularDestinationCard item={destination} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Grid>
  );
}

PopularDestinations.propTypes = {
  setCurrentId: PropTypes.func,
};

export default PopularDestinations;
