import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/post.js';
import useStyles from './styles';

function Posts({ setCurrentId }) {
  const { posts, isLoading } = useSelector((state) => state.posts);
  console.log(posts);
  const classes = useStyles();
  console.log(typeof posts);
  console.log(posts);
  if (!posts.length && !isLoading) return 'No Posts';
  console.log('after', posts);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
