import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  Backdrop,
  TextField,
  Grid,
  Input,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EventCard from './Display/EventCard';
import { getEvents } from '../../actions/events';
import useStyles from './styles.js';
import Paginate from './Paginate';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Events() {
  const { events, isLoading } = useSelector((state) => state.events);
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
    <>
      {user && user.result.isAdmin ? (
        <Link to="/events/new">
          <Button variant="outlined" color="primary" onClick={() => {}}>
            {' '}
            Add a new Event
{' '}
          </Button>
        </Link>
      ) : null}
      <Grid container spacing={3} className={classes.events}>
        {events ? (
          events?.map((event) => (
            <Grid item xs={12}>
              <EventCard event={event} userId={userId} small={false} />
            </Grid>
          ))
        ) : (
          <Typography>no events</Typography>
        )}
      </Grid>
      <Grid item xs={12} alignItems="center" justifyContent="center" className={classes.actionDiv}>
        <Paginate page={page} />
      </Grid>
    </>
  );
}

export default Events;
