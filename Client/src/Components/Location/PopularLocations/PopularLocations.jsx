import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './styles.js';
import { Skeleton } from '@mui/material';
import PopularLocationsCard from '../PopularLocationsCard/PopularLocationsCard.jsx';
import { getTopLocations } from '../../../actions/locations.js';
import SecondaryButton from '../../Button/SecondaryButton.jsx';
import ArrowRight from '../../../assets/icons/ArrowRight.jsx';
import PropTypes from 'prop-types';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PopularLocations({ setCurrentId }) {
  const { locations, isLoadingLocations } = useSelector((state) => state.locations);
  console.log('Received  in compoenent :', locations);
  const user = useSelector((state) => state.auth.user);
  const value = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log('recieved locations in component ', locations, value);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getTopLocations());
  }, []);

  if (!isLoadingLocations && !locations?.length) {
    return <div>No Locations</div>;
  }

  return (
    <Grid container className={classes.root}>
      <Grid
        style={{
          alignSelf: 'start',
          padding: '3em',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        spacing={3}>
        <Typography className={classes.Title}>Hotels and Restaurants</Typography>
        <SecondaryButton content={'View all'} icon={ArrowRight} />
      </Grid>
      <div className={classes.Container}>
        {isLoadingLocations ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              columnGap: '2em',
              padding: '3em',
            }}>
            {Array.from(new Array(4)).map((item, index) => (
              <Grid item key={index} style={{ width: '100%' }}>
                <Box style={{ width: '100%' }}>
                  <Skeleton variant="rounded" width={'70%'} height={350} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width="40%" />
                  </Box>
                </Box>
              </Grid>
            ))}
          </div>
        ) : (
          <div className={classes.Container}>
            {locations?.map((location) => (
              // <Grid key={location._id} item xs={12} sm={6} md={2} lg={2}>
              <PopularLocationsCard
                item={location}
                setCurrentId={setCurrentId}
                key={location._id}
              />
              // </Grid>
            ))}
          </div>
        )}
      </div>
    </Grid>
  );
}
PopularLocations.propTypes = {
  setCurrentId: PropTypes.func,
};

export default PopularLocations;
