import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.js';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useDispatch } from 'react-redux';
import image from '../../../Images/tokyo.jpg';
import useStyles from './styles.js';
import { likeDestination } from '../../../actions/destinations.js';
import RatingComponent from '../../Rating/RatingComponent';
import LocationIcon from '../../../assets/icons/LocationIcon';
function PopularLocationsCard({ item, userId, small }) {
  const classes = useStyles();
  const history = useHistory();
  console.log('card', item);
  return (
    <Card className={classes.smallCard} onClick={() => history.push(`/locations/${item._id}`)}>
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
            <Typography className={classes.description}>
              {item.destination.title},{item.country.title}
            </Typography>
          </div>
          <RatingComponent readOnly={true} avgRating={item.avgRating} />
        </div>
      </CardContent>
    </Card>
  );
}

export default PopularLocationsCard;
