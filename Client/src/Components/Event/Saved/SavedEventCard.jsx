import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import React from 'react';
import useStyles from './styles.js';
import { Link } from 'react-router-dom/cjs/react-router-dom.js';
import PropTypes from 'prop-types';

const SavedEventCard = ({ item }) => {
  const classes = useStyles();
  const lines = item.description.split(',');
  const firstThreeLines = lines.slice(0, 2).join(' ,');
  return (
    <Card className={classes.smallCard}>
      <CardMedia className={classes.media} image={item.coverImage} />
      <CardContent className={classes.content}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={item.coverImage ? classes.title : classes.noImageTitle}>
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          className={!item.coverImage ? classes.noImageDesctiption : null}>
          {firstThreeLines}...
        </Typography>
        <Link to={`/events/${item._id}`}>
          <Button className={item.coverImage ? classes.button : classes.buttonNoImage}>
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
SavedEventCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
export default SavedEventCard;
