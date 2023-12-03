import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import React from 'react';
import useStyles from './styles.js';
import { Link } from 'react-router-dom/cjs/react-router-dom.js';
import PropTypes from 'prop-types';
const LocationCard = ({ item, small }) => {
  const classes = useStyles();
  const lines = item.description.split(',');
  const firstThreeLines = lines.slice(0, 2).join(' ,');
  return (
    <Card className={small ? classes.smallCard : classes.card}>
      <CardMedia className={classes.media} image={item.coverImage} />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {item.title}
        </Typography>
        <Typography variant="body2" component="p">
          {firstThreeLines}...
        </Typography>
        <Link to={`/locations/${item._id}`}>
          <Button className={classes.button}>Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
LocationCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  small: PropTypes.bool,
};

export default LocationCard;
