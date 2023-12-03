import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';
const PostInfo = ({ post }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {post?.destination?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.info}>
          Cost: ${post?.cost}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.info}>
          Number of People: {post?.numberOfTravelers}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.info}>
          Duration: {post?.duration} days
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.info}>
          Date: {new Date(post?.createdAt).toDateString()}
        </Typography>
        <Typography variant="h6" className={classes.locationsTitle}>
          Locations:
        </Typography>
        <List className={classes.locationsList}>
          {post?.locations?.map((location, index) => (
            <ListItem key={index} className={classes.locationItem}>
              <ListItemText primary={location.location.name} className={classes.locationText} />
              <Typography variant="body2" color="textSecondary" className={classes.locationCost}>
                Cost: ${location.costPerLocation}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
PostInfo.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    destination: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    cost: PropTypes.number.isRequired,
    numberOfTravelers: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        costPerLocation: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};

export default PostInfo;
