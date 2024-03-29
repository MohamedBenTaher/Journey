import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../../actions/posts';
import PropTypes from 'prop-types';

function ComentSection({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.auth.user);
  const commentsRef = useRef();
  const handleClick = async () => {
    const finalComment = `${user?.result?.name} : ${comment}`;
    const newComments = dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong> {c.split(': ')[0]}</strong>
              {c.split(': ')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h5">
              Comment this Journey
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
ComentSection.propTypes = {
  post: PropTypes.object,
};
ComentSection.defaultProps = {
  post: {},
};

export default ComentSection;
