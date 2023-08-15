import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EventCard from './Display/EventCard';
import { getEvents } from '../../actions/events';
import useStyles from './styles.js';
import Paginate from './Paginate';
import { Skeleton } from '@mui/material';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Events() {
  const { events, isLoadingEvents } = useSelector((state) => state.events);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userId = user?.result?._id;
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);
  useEffect(() => {
    dispatch(getEvents(1));
  }, []);
  console.log(typeof events, events);
  return (
    <Grid container className={classes.mainContainer}>
      {user && user.result.isAdmin ? (
        <Link to="/events/new">
          <Button variant="outlined" color="primary" onClick={() => {}}>
            {' '}
            Add a new Event
            {' '}
          </Button>
        </Link>
      ) : null}
      {
        isLoadingEvents ?(
         <Grid container sx={{width:'100%',padding:'3em'}} spacing={3} >
           {Array.from(new Array(3)).map((item, index) => (
            <Grid item container xs={12} spacing={3}  key={index} sx={{
            }}>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ pt: 0.5 }}>
              <Skeleton
                variant="rounded"m
                width={{ xs: '100%', md: '50%' }}
                height={300}
              />
         </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
             </Grid>
        ))}
      </Grid>
        ):
      (
      <Grid container spacing={3} className={classes.events}>
       {
          events?.map((event) => (
            <Grid item xs={12}>
              <EventCard event={event} userId={userId} small={false} />
            </Grid>
          ))
        }
      </Grid>
      )}
      <Grid item xs={12} alignItems="center" justifyContent="center" className={classes.actionDiv}>
        <Paginate page={page} />
      </Grid>
    </Grid>
  );
}

export default Events;
