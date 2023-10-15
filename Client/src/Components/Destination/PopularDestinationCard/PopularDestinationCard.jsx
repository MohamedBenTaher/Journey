import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.js';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useDispatch } from 'react-redux';
import image from '../../../Images/tokyo.jpg';
import useStyles from './styles.js';
import { likeDestination } from '../../../actions/destinations.js';

function PopularDestinationCard({ item, userId, small }) {
  const classes = useStyles();
  console.log('card', item);
  return (
    <Card className={classes.smallCard}>
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

export default PopularDestinationCard;
