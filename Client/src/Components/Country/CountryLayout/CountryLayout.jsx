import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import  Paginate from './Paginates';
import { useLocation } from 'react-router-dom';
import CountryCard from '../CountryCard/CountryCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CountryLayout = ({ setCurrentId }) => {
  const { countries, isLoading } = useSelector((state) => state.countries);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();

  if (isLoading && countries?.length === 0) {
    return <div>No Countries</div>;
  }
console.log('test')
  return (
    <><div className={classes.mainContainer}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="start">
          {countries?.map((country) => (
            <Grid key={country._id} item xs={12} sm={6} md={4} lg={4}>
              <CountryCard country={country} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
    <Grid item xs={12} alignItems='center' justifyContent='center' className={classes.actionDiv}>
        <Paginate page={page} />
     </Grid></>

  );
};

export default CountryLayout;
