import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.js';
import useStyles from './styles.js';
import { likeDestination } from '../../../actions/destinations.js';
import PropTypes from 'prop-types';

function PopularDestinationCard({ item, userId, small }) {
  const history = useHistory();
  const classes = useStyles();
  console.log('card', item);
  return (
    <Card className={classes.smallCard} onClick={() => history.push(`/destinations/${item._id}`)}>
      <CardMedia className={classes.media} image={item.coverImage} />
      <CardContent className={classes.content} style={{ height: '30%' }}>
        <Typography gutterBottom className={classes.title}>
          {item.title}
        </Typography>
        <Typography className={classes.description}>{item.country.title}</Typography>
      </CardContent>
    </Card>
  );
}
PopularDestinationCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    country: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default PopularDestinationCard;
