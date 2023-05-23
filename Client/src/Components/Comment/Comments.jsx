import React, { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, Divider, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { getDestinationComments, createComment, updateMyComment, deleteComment } from '../../actions/comments.js';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
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
  actionButton:{
    width:'10%',

  }
}));

const Comments = ({ entityId, entityType,user }) => {
  const classes = useStyles();
  const {comments,isLoading}=useSelector(state => state.comments);
  console.log('my state',comments)
  const dispatch = useDispatch();
  const [edit, setEdit] = useState([]);
  const userId = user?.result?._id;

  useEffect(() => {
    dispatch(getDestinationComments(entityId, entityType));
  }, [entityId, entityType, dispatch]);

  const handleAddComment = values => {
    console.log(values);
    if (userId && entityId && entityType && values.comment) {
      dispatch(createComment(entityId, entityType, userId, values.comment));
    }
  };
  const handleSubmitEditComment=(values)=>{
    console.log('values',values)
    if (userId && entityId && values.commenttoupdate) {
      dispatch(updateMyComment(values.id, userId , values.commenttoupdate));
    }
  }
  const handleDeleteComment = (id) => {
    console.log(id);
    if (id) {
      dispatch(deleteComment(id));
    }
  };
  const handleEdit = index => {
    const newEdit = [...edit];
    newEdit[index] = true;
    setEdit(newEdit);
  };

  const handleCancelEdit = index => {
    const newEdit = [...edit];
    newEdit[index] = false;
    setEdit(newEdit);
  };

  return (
    <Box className={classes.commentsContainer}>
      {isLoading ? (
        <div>Loading comments...</div>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <List>
            {
            comments?.map((comment, index) => (
              <React.Fragment key={comment?._id}>
                <ListItem alignItems="flex-start">
                  {!edit[index] && (
                    <>
                      <ListItemText primary={comment?.content} secondary={`Author: ${comment?.user?.name}`} />
                      {comment?.user._id === userId && (
                        <>
                          <Button onClick={() => handleEdit(index)}>
                            <ModeEditIcon className={classes.actionButton} />
                          </Button>
                          <Button onClick={()=>handleDeleteComment(comment?._id)}>
                            <DeleteIcon className={classes.actionButton} />
                          </Button>
                        </>
                      )}
                    </>
                  )}
                  {edit[index] && (
                    <Formik initialValues={{ commenttoupdate: comment.content ,id:comment._id }} onSubmit={handleSubmitEditComment}>
                      {({ handleSubmit }) => (
                        <Form>
                          <Field
                            as={TextField}
                            name="commenttoupdate"
                            label="Edit Comment"
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
                            Edit Comment
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => handleCancelEdit(index)}
                            className={classes.addCommentButton}
                          >
                            Cancel Edit
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  )}
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
        </>
      )}
    </Box>
  );
};

export default Comments;
