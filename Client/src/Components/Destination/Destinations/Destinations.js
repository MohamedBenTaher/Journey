import React, { useState } from 'react';
import { Grid, CircularProgress, Box, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import DestinationCard from '../DestinationCard/Destination.js';
import Paginate from './Pagination.jsx';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Destinations({ setCurrentId }) {
  const { destinations, isLoadingDestinations } = useSelector((state) => state.destinations);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.result?._id;
  console.log('dest user', user?.result?.isAdmin);
  const value = useSelector((state) => state);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  console.log('mu user ', user);
  if (!isLoadingDestinations && !destinations.length) {
    return <div>No Destinations</div>;
  }
  console.log('test');
  return (
    <>
      <div className={classes.mainContainer}>
        <Grid container spacing={3} justifyContent="start">
          {(user?.result?.userType == 'Admin' || user?.result?.userType == 'Organizer') && (
            <Grid container spacing={3} justifyContent="start">
              <Grid item>
                <Link to="/destinations/new/">
                  <Button variant="contained" color="primary">
                    New Destination
                  </Button>
                </Link>
              </Grid>
            </Grid>
          )}
          <Grid item container spacing={3} justifyContent="start">
            {destinations?.map((destination) => (
              <Grid key={destination._id} item xs={12} sm={6} md={6} lg={4}>
                <DestinationCard
                  item={destination}
                  setCurrentId={setCurrentId}
                  userId={user?.user?._id}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
      <Grid item xs={12} alignItems="center" justifyContent="center" className={classes.actionDiv}>
        <Paginate page={page} />
      </Grid>
    </>
  );
}

Destinations.propTypes = {
  setCurrentId: PropTypes.func,
};
Destinations.defaultProps = {
  setCurrentId: null,
};

export default Destinations;
