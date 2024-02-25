import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles.js';
import LocationIcon from '../../../assets/icons/LocationIcon';
import PropTypes from 'prop-types';
import moment from 'moment';
import Calendar from '../../../assets/icons/Calendar.jsx';

function PopularEventCard({ item, userId, small }) {
  const classes = useStyles();
  const history = useHistory();
  console.log('card', item);
  return (
    <Card className={classes.smallCard} onClick={() => history.push(`/events/${item._id}`)}>
      <CardMedia className={classes.media} image={item.coverImage} />
      <CardContent className={classes.content}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'start',
            // gap: '1em',
            width: '100%',
          }}>
          <Typography gutterBottom className={classes.title}>
            {item.title}
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              width: '100%',
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                width: '100%',
              }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.5em',
                }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Typography variant="body2">
                    {moment(item.startDate).format('DD, MMMM')}
                  </Typography>

                  <Typography variant="body2">
                    from <strong>{item.eventFee}$ </strong>per adult{' '}
                  </Typography>
                </div>
                <Typography style={{ textAlign: 'center' }}>
                  <strong>{item.numberOfPlaces - item.attendants.length}</strong> Left
                </Typography>
              </div>
            </div>
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
