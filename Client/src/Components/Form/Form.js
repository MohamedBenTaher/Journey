import React, { useState, useEffect } from 'react'
import useStyles from "./styles.js"
import { TextField, Typography, Button, Paper, Modal, Fade } from '@material-ui/core';
import FileBase from 'react-file-base64'

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts.js';
const user = JSON.parse(localStorage.getItem('profile'))
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '', message: '', tags: '', selectedFile: ''
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId !== 0) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
      clear();
    }
    else {

      dispatch(createPost({ ...postData, name: user?.result?.name }));

      clear();
    }
  }
  useEffect(() => {
    if (post) setPostData(post)
    if (!post?.title) clear();

  }, [post])
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create Your memories
        </Typography>

      </Paper>
    )

  }



  return (
    <><Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}
          style={{ transformOrigin: '0 0 0' }}
          {...(open ? { timeout: 1000 } : {})}>
          <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
              <Typography variant='h6'>{currentId !== 0 ? 'Update your Memory' : 'create A Memory'}</Typography>

              <TextField
                name='title'
                variant='outlined'
                label='Title'
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

              <TextField
                name='message'
                variant='outlined'
                label='Message'
                fullWidth
                value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

              <TextField
                name='tags'
                variant='outlined'
                label='tags'
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

              <div className={classes.fileInput}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
              </div>
              <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type="submit" fullWidth>Submit</Button>
              <Button className={classes.buttonSubmit} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>

          </Paper></Fade>
      </Modal></>
  );
}
export default Form