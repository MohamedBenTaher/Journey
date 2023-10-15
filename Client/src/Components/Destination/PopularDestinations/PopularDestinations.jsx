import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './styles.js';
import PopularDestinationCard from '../PopularDestinationCard/PopularDestinationCard.jsx';
import { Skeleton } from '@mui/material';
import { getTopDestinations } from '../../../actions/destinations.js';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PopularDestinations({ setCurrentId }) {
  const { destinations, isLoadingDestinations } = useSelector((state) => state.destinations);
  console.log('Received  in compoenent :', destinations);
  const user = useSelector((state) => state.auth.user);
  const value = useSelector((state) => state);
  const query = useQuery();
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
      <Typography className={classes.Title}>Popular Destiantions</Typography>
      <>
        <div className={classes.mainContainer}>
          {isLoadingDestinations ? (
            <Grid container spacing={3}>
              {Array.from(new Array(3)).map((item, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                  <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                    <Skeleton variant="rounded" width={'100%'} height={300} />
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton />
                      <Skeleton width="60%" />
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
      </>
    </Grid>
  );
}

export default PopularDestinations;
