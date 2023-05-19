import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import DestinationCard from '../DestinationCard/Destination.js';
import Paginate from './Pagination';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Destinations = ({ setCurrentId }) => {
  const { destinations, isLoading } = useSelector((state) => state.destinations);
  const  value = useSelector((state) => state);
  console.log('my dests',destinations)
  console.log('my vals',value)
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();

  if (!isLoading && destinations.length === 0) {
    return <div>No Destinations</div>;
  }

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {destinations?.map((destination) => (
            <Grid key={destination._id} item xs={12} sm={6} md={6} lg={4}>
              <DestinationCard destination={destination} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
      <Grid>
        <Paginate page={page} />
      </Grid>
    </div>
  );
};

export default Destinations;
