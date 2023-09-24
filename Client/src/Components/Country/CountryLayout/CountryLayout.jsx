import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Paginate from './Paginates';
import { useLocation } from 'react-router-dom';
import CountryCard from '../CountryCard/CountryCard';
import { Skeleton } from '@mui/material';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CountryLayout = ({ setCurrentId }) => {
  const { countries, isLoadingCountries } = useSelector((state) => state.countries);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.result?._id;
  S;
  if (!isLoadingCountries && countries?.length === 0) {
    return <div>No Countries</div>;
  }
  return (
    <>
      <div className={classes.mainContainer}>
        {isLoadingCountries ? (
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
          <Grid container spacing={3}>
            {countries?.map((country) => (
              <Grid key={country._id} item xs={12} sm={6} md={4} lg={3}>
                <CountryCard item={country} userId={userId} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <Grid item xs={12} alignItems="center" justifyContent="center" className={classes.actionDiv}>
        <Paginate page={page} />
      </Grid>
    </>
  );
};

export default CountryLayout;
