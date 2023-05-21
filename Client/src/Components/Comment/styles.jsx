import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, Divider, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { fetchComments, addComment } from '../actions/comments';

const useStyles = makeStyles(theme => ({
  commentsContainer: {
    marginTop: theme.spacing(4),
  },
  commentInput: {
    marginTop: theme.spacing(2),
  },
  addCommentButton: {
    marginTop: theme.spacing(2),
  },
}));

const Comments = ({ entityId, entityType }) => {
  const classes = useStyles();
  const comments = useSelector(state => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(entityId, entityType));
  }, [dispatch, entityId, entityType]);

  const handleAddComment = values => {
    dispatch(addComment(entityId, entityType, values.comment));
  };

  return (
    <Box className={classes.commentsContainer}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map(comment => (
          <React.Fragment key={comment._id}>
            <ListItem alignItems="flex-start">
              <ListItemText primary={comment.content} secondary={`Author: ${comment.author}`} />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      <Formik initialValues={{ comment: '' }} onSubmit={handleAddComment}>
        {({ handleSubmit }) => (
          <Form>
            <Field
              as={TextField}
              name="comment"
              label="Add Comment"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              className={classes.commentInput}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.addCommentButton}
            >
              Add Comment
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Comments;