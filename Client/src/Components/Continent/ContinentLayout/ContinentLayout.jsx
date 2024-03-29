import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Paginate from './Paginate';
import { useLocation } from 'react-router-dom';
import ContinentCard from '../ContinentCard/ContinentCard';
import PropTypes from 'prop-types';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ContinentLayout = ({ setCurrentId }) => {
  const { continents, isLoading } = useSelector((state) => state.continents);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();

  if (isLoading && continents.length === 0) {
    return <div>No Contitnents</div>;
  }
  return (
    <>
      <div className={classes.mainContainer}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3} justifyContent="start">
            {continents?.map((continent) => (
              <Grid key={continent._id} item xs={12} sm={6} md={6} lg={4}>
                <ContinentCard
                  continent={continent}
                  //  setCurrentId={setCurrentId}
                />
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
ContinentLayout.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
};

export default ContinentLayout;
