import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import React from 'react';
import useStyles from './styles.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const PostCard = ({ item, small, profile }) => {
  const classes = useStyles();
  const lines = item?.message?.split(',');
  const firstThreeLines = lines?.slice(0, 2).join(' ,');
  return (
    <Card className={profile ? classes.profile : classes.smallCard}>
      <CardMedia className={classes.media} image={item?.selectedFile} />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {item?.title}
        </Typography>
        <Typography variant="body2" component="p">
          {firstThreeLines}...
        </Typography>
        <Link to={`/stories/${item?._id}`}>
          <Button className={classes.button}>Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
PostCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    selectedFile: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  small: PropTypes.bool,
  profile: PropTypes.bool,
};
export default PostCard;
