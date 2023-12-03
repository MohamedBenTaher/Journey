import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './styles.js';
import { Skeleton } from '@mui/material';
import { getTopEvents } from '../../../actions/events.js';
import SecondaryButton from '../../Button/SecondaryButton.jsx';
import ArrowRight from '../../../assets/icons/ArrowRight.jsx';
import PopularEventCard from '../PopularEventCard/PopularEventCard.jsx';
import PropTypes from 'prop-types';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PopularEvents({ setCurrentId }) {
  const { events, isLoadingEvents } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getTopEvents());
  }, []);

  if (!isLoadingEvents && !events?.length) {
    return <div>No Events</div>;
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
        <Typography className={classes.Title}>Events and trips</Typography>
        <SecondaryButton content={'View all'} icon={ArrowRight} />
      </Grid>
      <div className={classes.mainContainer}>
        {isLoadingEvents ? (
          <Grid container spacing={4}>
            {Array.from(new Array(3)).map((item, index) => (
              <Grid item key={index}>
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
          <div className={classes.Container}>
            {events?.map((event) => (
              <PopularEventCard item={event} setCurrentId={setCurrentId} key={event?._id} />
            ))}
          </div>
        )}
      </div>
    </Grid>
  );
}
PopularEvents.propTypes = {
  setCurrentId: PropTypes.func,
};
export default PopularEvents;
