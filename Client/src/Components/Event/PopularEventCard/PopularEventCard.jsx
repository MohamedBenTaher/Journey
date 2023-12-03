import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles.js';
import LocationIcon from '../../../assets/icons/LocationIcon';
import PropTypes from 'prop-types';

function PopularEventCard({ item, userId, small }) {
  const classes = useStyles();
  const history = useHistory();
  console.log('card', item);
  return (
    <Card className={classes.smallCard} onClick={() => history.push(`/events/${item._id}`)}>
      <CardMedia className={classes.media} image={item.coverImage} />
      <CardContent className={classes.content} style={{ height: '30%' }}>
        <Typography gutterBottom className={classes.title}>
          {item.title}
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              height: '2em',
            }}>
            <LocationIcon />
            <Typography>{item.startDate}</Typography>
            <Typography>{item.eventFee}</Typography>
            <Typography>{item.numberOfPlaces}</Typography>
            <Typography>{item.numberOfPlaces - item.attendants.length}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
PopularEventCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    eventFee: PropTypes.string.isRequired,
    numberOfPlaces: PropTypes.number.isRequired,
    attendants: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default PopularEventCard;
