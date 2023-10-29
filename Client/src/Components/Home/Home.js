import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
 Grid, Container, Grow
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts.js';
import { getPostsBySearch } from '../../actions/posts.js';
import Pagination from '../Pagination';
import useStyles from './styles.js';
import Hero from '../Hero/Hero.js';
import PopularDestinations from '../Destination/PopularDestinations/PopularDestinations.jsx';
import PopularLocations from '../Location/PopularLocations/PopularLocations.jsx';
import PopularPosts from '../Posts/PopularPosts/PopularPosts.jsx';
import PopularEvents from '../Event/PopularEvents.jsx/PopularEvents.jsx';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/stories/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <Hero />
      
          <Grid
            className={classes.gridContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            {/* <Grow in>
            <Grid item xs={12} sm={12} md={12}>
              <Posts setCurrentId={setCurrentId} />
              {!searchQuery && !tags.length && (
                <Grid>
                  <Pagination page={page} />
                </Grid>
              )}
            </Grid>
            </Grow> */}
            <PopularDestinations/>
            <PopularLocations/>
            <PopularPosts/>
            <PopularEvents/>
          </Grid>
     
    </div>
  );
}

export default Home;
