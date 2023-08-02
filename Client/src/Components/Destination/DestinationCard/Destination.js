import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './styles.js';
import image from '../../../Images/tokyo.jpg';
import { Link } from 'react-router-dom/cjs/react-router-dom.js';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useDispatch } from 'react-redux';
import { likeDestination } from '../../../actions/destinations.js';
const DestinationCard = ({ destination, userId, small }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(destination?.likedBy);
  const lines = destination.description.split(',');
  const firstThreeLines = lines.slice(0, 2).join(' ,');
  return (
    <Card className={small ? classes.smallCard : classes.card}>
      <CardMedia className={classes.media} image={destination.coverImage} />
      <CardContent className={classes.content}>
        {!small ? (
          <div className={classes.likeButton}>
            <IconButton
              className={classes.likeButton}
              onClick={() => dispatch(likeDestination(destination._id, userId))}
              disabled={!userId || small}
            >
              {likes.find((like) => like === userId) ? (
                <FavoriteOutlinedIcon style={{ color: 'white' }} />
              ) : (
                <FavoriteBorderOutlinedIcon style={{ color: 'white' }} />
              )}
            </IconButton>
            <Typography className={classes.likeCount}>{likes.length}</Typography>
          </div>
        ) : null}
        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {destination.title}
        </Typography>
        <Typography variant="body2" component="p" className={classes.description}>
          {firstThreeLines}...
        </Typography>
        <Link to={`/destinations/${destination._id}`}>
          <Button className={classes.button}>Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
