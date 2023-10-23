import React from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Paginate from './Paginate.jsx';
import { Link, useLocation } from 'react-router-dom';
import LocationCard from '../LocationCard/LocationCard';
import { Skeleton } from '@mui/material';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const LocationLayout = ({ setCurrentId }) => {
  const { locations, isLoadingLocations } = useSelector((state) => state.locations);
  const user = useSelector((state) => state.auth.user);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  if (!isLoadingLocations && !locations.length) {
    return <div>No Locations</div>;
  }
  return (
    <>
      <div className={classes.mainContainer}>
        <Grid container spacing={3} justifyContent="start">
          {user?.result?.isAdmin && (
            <Grid container spacing={3} justifyContent="start">
              <Grid item>
                <Link to="/locations/new/">
                  <Button variant="contained" color="primary">
                    New Location
                  </Button>
                </Link>
              </Grid>
            </Grid>
          )}
          {isLoadingLocations ? (
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
              {locations?.map((location) => (
                <Grid key={location._id} item xs={12} sm={6} md={6} lg={4}>
                  <LocationCard item={location} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
          )}
          <Grid
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            className={classes.actionDiv}>
            <Paginate page={page} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LocationLayout;
