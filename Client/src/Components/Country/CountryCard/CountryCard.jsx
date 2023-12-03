import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likeCountry } from '../../../actions/country';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      position: 'relative',
      width: '100%',
      height: 400,
      transition: 'all 0.5s',
      borderRadius: '15px',
      '&:hover': {
        transform: 'scale(1.05)',
        '& $content': {
          opacity: 1,
        },
      },
    },
    smallCard: {
      position: 'relative',
      width: '100%',
      height: 300,
      width: 300,
      margin: 20,
      transition: 'all 0.5s',
      borderRadius: '15px',
      '&:hover': {
        transform: 'scale(1.05)',
        '& $content': {
          opacity: 1,
        },
      },
    },
    backgroundImage: {
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(70%)',
      transition: 'all .5s ease-in-out',
      cursor: 'pointer',
    },
    content: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      color: '#fff',
      opacity: 1,
      width: '100%',
      transition: 'all 0.5s',
      cursor: 'pointer',
    },
    likeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      color: '#fff',
      '&:hover': {
        color: '#fff',
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
      },
      zIndex: 99,
    },
    title: {
      fontWeight: 'bold',
      fontSize: '2rem',
      marginBottom: theme.spacing(1),
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: '0.9rem',
    },
  }),
);

const CountryCard = ({ item, userId, small }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item?.likedBy || []);
  const handleLike = () => {
    try {
      dispatch(likeCountry(item?._id, userId));
      setLiked(!liked);
      setLikes((prevLikes) => {
        if (liked) {
          return prevLikes.filter((id) => id !== userId);
        } else {
          return [...prevLikes, userId];
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (item) {
      setLiked(item?.likedBy?.includes(userId));
      setLikes(item?.likedBy || []);
    }
  }, [item, userId]);
  const Likes = () => {
    if (likes.length > 0 && !small) {
      return liked ? (
        <>
          <FavoriteOutlinedIcon style={{ color: 'white' }} />
        </>
      ) : (
        <>
          <FavoriteBorderOutlinedIcon style={{ color: 'white' }} />
        </>
      );
    }
    return (
      <>
        <FavoriteBorderOutlinedIcon style={{ color: 'white' }} />
      </>
    );
  };
  console.log('item in card', item);
  return (
    //to be added

    <Card className={small ? classes.smallCard : classes.card}>
      <CardMedia
        image={item.coverImage}
        alt={item?.name}
        className={classes.backgroundImage}
        onClick={() => history.push(`/countries/${item?._id}`)}
      />
      {!small ? (
        <IconButton className={classes.likeButton} onClick={handleLike}>
          <Likes />
        </IconButton>
      ) : null}
      <CardContent className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          {item?.title}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {item?.continent?.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
CountryCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    likedBy: PropTypes.array,
    coverImage: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    continent: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  userId: PropTypes.string.isRequired,
  small: PropTypes.bool,
};
export default CountryCard;
