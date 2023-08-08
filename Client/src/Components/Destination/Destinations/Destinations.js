import React, { useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';
import DestinationCard from '../DestinationCard/Destination.js';
import Paginate from './Pagination.jsx';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Destinations({ setCurrentId }) {
  const { destinations, isLoading } = useSelector((state) => state.destinations);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const value = useSelector((state) => state);
  console.log('my dests', destinations);
  console.log('my vals', value);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();

  if (isLoading && destinations.length === 0) {
    return <div>No Destinations</div>;
  }
  console.log('test');
  return (
    <>
      <div className={classes.mainContainer}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3} justifyContent="start">
            {destinations?.map((destination) => (
              <Grid key={destination._id} item xs={12} sm={6} md={6} lg={4}>
                <DestinationCard
                  item={destination}
                  setCurrentId={setCurrentId}
                  userId={user?.result._id}
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
