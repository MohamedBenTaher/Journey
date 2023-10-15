import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Container,
  Grow,
  AppBar,
  TextField,
  Button,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles.js';
import SearchInput from '../Inputs/SearchInput';
import Calendar from '../../assets/icons/Calendar';
import Activities from '../../assets/icons/Activities';
import LocationPin from '../../assets/icons/LocationPin';
import Guests from '../../assets/icons/Guests';
import SearchIcoon from '../../assets/icons/SearchIcon';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchBar() {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [season, setSeason] = useState([]);

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const items = [
    {
      label: 'Location',
      icon: LocationPin,
      name: 'location',
      placeholder: 'Explore nearby destinations',
      type: 'text',
      value: search,
    },
    {
      label: 'Activities',
      icon: Activities,
      name: 'activities',
      placeholder: 'All Activities',
      type: 'text',
      value: search,
    },
    {
      label: 'When',
      icon: Calendar,
      name: 'date',
      placeholder: 'Choose a Date',
      type: 'text',
      value: search,
    },
    {
      label: 'Guests',
      icon: Guests,
      name: 'guests',
      placeholder: '1 guest',
      type: 'number',
      value: search,
    },
  ];

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      dispatch(
        getPostsBySearch({
          search,
          tags: tags.join(','),
          season,
        })
      );
      history.push(
        `/stories/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}&season=${
          season || 'none'
        }`
      );
    } else {
      history.push('/stories');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
<Grid container spacing={2} className={classes.appBarSearch}>
      <Grid item className={classes.Inputs}>
        {items.map((item, index) => (
          <SearchInput
            key={index}
            label={item.label}
            name={item.name}
            value={search}
            placeholder={item.placeholder}
            Icon={item.icon}
          />
        ))}
      </Grid>
      <Grid item className={classes.buttonContainer}>
        <Button
          onClick={searchPost}
          className={classes.searchButton}
          variant="contained"
          color="primary"
          fullWidth
        >
          <SearchIcoon  />
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
