import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/post.js';
import useStyles from './styles';
import { Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
function Posts({ setCurrentId }) {
  const { posts, isLoadingPosts } = useSelector((state) => state.posts);
  const classes = useStyles();
  if (!posts.length && !isLoadingPosts) return 'No Posts';
  return isLoadingPosts ? (
    <Grid container spacing={3}>
      {Array.from(new Array(3)).map((item, index) => (
        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
          <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rounded" width={'100%'} height={300} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
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
Posts.propTypes = {
  setCurrentId: PropTypes.func,
};
Posts.defaultProps = {
  setCurrentId: null,
};
export default Posts;
