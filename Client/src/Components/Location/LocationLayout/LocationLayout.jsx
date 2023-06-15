import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import  Paginate from './Paginate.jsx';
import { useLocation } from 'react-router-dom';
import LocationCard from '../LocationCard/LocationCard';
import NavbarSecondary from '../../Navbar/NavbarSecondary';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const LocationLayout = ({ setCurrentId }) => {
  const { locations, isLoading } = useSelector((state) => state.locations);
  const  value = useSelector((state) => state);
  console.log('my dests',locations)
  console.log('my vals',value)
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();

  if (isLoading && locations.length === 0) {
    return <div>No Locations</div>;
  }
console.log('test')
  return (
    <><NavbarSecondary/>
    <div className={classes.mainContainer}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="start">
          {locations?.map((location) => (
            <Grid key={location._id} item xs={12} sm={6} md={6} lg={4}>
              <LocationCard location={location} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
    <Grid item xs={12} alignItems='center' justifyContent='center' className={classes.actionDiv}>
        <Paginate page={page} />
     </Grid></>

  );
};

export default LocationLayout;
