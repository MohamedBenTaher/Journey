import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getContinents } from '../../../actions/continent.js';
import PropTypes from 'prop-types';

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.continents);
  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getContinents(page));
    }
  }, [page, dispatch]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/continents?page=${item.page}`} />
      )}
    />
  );
};
Paginate.propTypes = {
  page: PropTypes.number,
};
export default Paginate;
