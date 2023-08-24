import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost, likePost } from '../../../actions/posts.js';
import useStyles from './styles.js';

function Post({ post, setCurrentId, small }) {
  const user = useSelector((state)=>state.auth.user)
  console.log('user',user)
  const userId = user?.result?.googleId || user?.user?._id;
  const [likes, setLikes] = useState(post?.likedBy);
  const hasLikedPost = post.likedBy.find((like) => like === userId);
  const history = useHistory();
  function Likes() {
    if (likes.length > 0 && !small) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;
          {likes.length} 
{' '}
{likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  }
  const openPost = () => {
    history.push(`/stories/${post._id}`);
  };
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePost(post._id, userId));
    if (hasLikedPost) {
      setLikes(post.likedBy.filter((id) => id !== userId));
    } else {
      setLikes([...post.likedBy, userId]);
    }
  };
  const lines = post.message.split(',');
  const firstThreeLines = lines.slice(0, 1).join(',');

  return (
    <Card className={small ? classes.smallCard : classes.card} raised elevation={6}>
      {userId == post?.creator && !small ? (
        <div className={classes.overlay2}>
          <Button
            style={{ color: 'white' }}
            size="small"
            onClick={() => history.push(`/stories/new/${post._id}`)}
          >
            <MoreHorizonIcon fontSize="medium" />
          </Button>
        </div>
      ) : null}
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {!small ? (
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
        ) : null}
        <Typography variant="h5" className={classes.title} gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {firstThreeLines}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={!small ? classes.cardActions : classes.smallActions}>
        {!small ? (
          <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
            <Likes />
          </Button>
        ) : null}
        {userId == post?.creator && !small ? (
          <Button
            color="primary"
            size="small"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon />
            Delete
          </Button>
        ) : null}
        {small ? (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              history.push(`/stories/${post._id}`);
            }}
            variant="contained"
            className={classes.bookingButton}
          >
            Read post
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
export default Post;
