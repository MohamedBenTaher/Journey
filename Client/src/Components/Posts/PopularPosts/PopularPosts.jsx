import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles.js';
import { Skeleton } from '@mui/material';
import PopularPostCard from '../PopularPostCard/PopularPostCard.jsx';
import { getTopLocations } from '../../../actions/locations.js';
import SecondaryButton from '../../Button/SecondaryButton.jsx';
import ArrowRight from '../../../assets/icons/ArrowRight.jsx';
import { getTopPosts } from '../../../actions/posts.js';
import PropTypes from 'prop-types';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PopularPosts({ setCurrentId }) {
  const { posts, isLoadingPosts } = useSelector((state) => state.posts);
  console.log('Received  in compoenent :', posts);
  const user = useSelector((state) => state.auth.user);
  const value = useSelector((state) => state);
  const query = useQuery();
  const dispatch = useDispatch();
  console.log('recieved posts in component ', posts, value);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getTopPosts());
  }, []);
  if (!isLoadingPosts && !posts?.length) {
    return <div>No posts</div>;
  }
  console.log('test');
  return (
    <Grid container className={classes.root}>
      <Grid
        style={{
          alignSelf: 'start',
          padding: '3em',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        spacing={3}>
        <Typography className={classes.Title}>Travel Tips and Advice</Typography>
        <Link to="/stories" style={{ textDecoration: 'none' }}>
          <SecondaryButton content={'View all'} icon={ArrowRight} />
        </Link>
      </Grid>
      <div className={classes.mainContainer}>
        {isLoadingPosts ? (
          <Grid
            container
            spacing={4}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            {Array.from(new Array(2)).map((item, index) => (
              <div
                key={index}
                style={{
                  width: '50%',
                }}>
                <Box sx={{ marginRight: 0.5, my: 5, width: '50%' }}>
                  <Skeleton variant="rounded" width={'100%'} height={300} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                </Box>
              </div>
            ))}
          </Grid>
        ) : (
          <div className={classes.Container}>
            {posts?.map((post) => (
              <PopularPostCard item={post} setCurrentId={setCurrentId} key={post._id} />
            ))}
          </div>
        )}
      </div>
    </Grid>
  );
}
PopularPosts.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
};

export default PopularPosts;
