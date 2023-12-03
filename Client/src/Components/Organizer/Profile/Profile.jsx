import React, { useEffect } from 'react';
import useStyles from './styles';
import { Typography, Avatar, Grid, Paper, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../actions/auth';
import PropTypes from 'prop-types';
import { getEventsByCreator } from '../../../actions/events';
const OrganizerProfile = ({ id }) => {
  const { user, isLoading } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getEventsByCreator(id));
  }, []);
  const classes = useStyles();
  const [likedvalue, setLikedValue] = React.useState(0);
  const handleLikeChange = (event, newValue) => {
    setLikedValue(newValue);
  };
  const [savedValue, setSavedValue] = React.useState(0);
  const handleSaveChange = (event, newValue) => {
    setSavedValue(newValue);
  };
  console.log('organizer', user);
  if (!user && !isLoading) return <div>test</div>;
  const { events, isLoadingEvents } = useSelector((state) => state?.events);
  console.log('events', events);
  return (
    <Paper className={classes.root} elevation={3}>
      <Grid container className={classes.header} />
      <Grid container spacing={2} alignItems="center" className={classes.profileTop}>
        <Grid className={classes.avatarContainer}>
          <Avatar className={classes.avatar} src={user?.user?.avatar} alt={user?.user?.name} />
          <Grid className={classes.name}>
            <Typography variant="h6">{user?.user?.name}</Typography>
            <Typography variant="subtitle1">{user?.user?.email}</Typography>
          </Grid>
        </Grid>
        <div className={classes.title}>
          <Button variant="contained" color="secondary" className={classes.button}>
            Edit Profile
          </Button>
          <Button variant="contained" color="primary" className={classes.button}>
            Edit Profile
          </Button>
        </div>
      </Grid>
      <Grid container spacing={2} alignItems="center" className={classes.profileMiddle}>
        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.stat}>
          <Typography variant="h6">{user?.user?.events?.length}</Typography>
          <Typography variant="subtitle1">Events</Typography>
        </Grid>
        <Grid item container spacing={2} alignItems="center" className={classes.profileBottom}>
          <Grid item xs={12} sm={6} md={4} lg={3} className={classes.stat}>
            <Typography variant="h6">{user?.user?.events?.length}</Typography>
            <Typography variant="subtitle1">Events</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} className={classes.stat}>
            <Typography variant="h6">{user?.user?.followers?.length}</Typography>
            <Typography variant="subtitle1">Followers</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} className={classes.stat}>
            <Typography variant="h6">{user?.user?.following?.length}</Typography>
            <Typography variant="subtitle1">Following</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

OrganizerProfile.propTypes = {
  id: PropTypes.string.isRequired,
};
export default OrganizerProfile;
