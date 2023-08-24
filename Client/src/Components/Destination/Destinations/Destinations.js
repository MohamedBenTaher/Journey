import React, { useState } from 'react';
import { Grid, CircularProgress, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';
import DestinationCard from '../DestinationCard/Destination.js';
import Paginate from './Pagination.jsx';
import { Skeleton } from '@mui/material';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Destinations({ setCurrentId }) {
  const { destinations, isLoadingDestinations  } = useSelector((state) => state.destinations);
  const user = useSelector((state)=>state.auth.user)
  const value = useSelector((state) => state);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();

  if (!isLoadingDestinations && !destinations.length) {
    return <div>No Destinations</div>;
  }
  console.log('test');
  return (
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
          <Grid container spacing={3} justifyContent="start">
            {destinations?.map((destination) => (
              <Grid key={destination._id} item xs={12} sm={6} md={6} lg={4}>
                <DestinationCard
                  item={destination}
                  setCurrentId={setCurrentId}
                  userId={user?.user._id}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <Grid item xs={12} alignItems="center" justifyContent="center" className={classes.actionDiv}>
        <Paginate page={page} />
      </Grid>
    </>
  );
}

export default Destinations;
