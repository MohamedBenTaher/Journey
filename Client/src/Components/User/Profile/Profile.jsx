import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Avatar, Grid, Paper,Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  userInfo: {
    marginTop: theme.spacing(2),
  },
  infoItem: {
    marginBottom: theme.spacing(1),
  },
}));

const Profile = ({ user }) => {
  const classes = useStyles();
  const likedResources = []; // Replace with an array of liked resources
  const savedResources = []; // Replace with an array of saved resources

  return (
    <>
    <Paper className={classes.root} elevation={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar} src={user.avatar} alt={user.name} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{user.result.name}</Typography>
          <Typography variant="subtitle1">{user.result.email}</Typography>
        </Grid>
      </Grid>

      <div className={classes.userInfo}>
        <Typography variant="h6" className={classes.infoItem}>
          Age: {user.result.age}
        </Typography>
        <Typography variant="h6" className={classes.infoItem}>
          Address: {user.result.address}
        </Typography>
        <Typography variant="h6" className={classes.infoItem}>
          Type: {user.type}
        </Typography>
      </div>
   
    <div>
      <Typography variant="h6">Liked Resources</Typography>

      <Typography variant="h6">Saved Resources</Typography>
    </div>
    </Paper></>
  );
};

export default Profile;
