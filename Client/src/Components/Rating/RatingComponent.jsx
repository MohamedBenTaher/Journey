import { Rating } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
const RatingComponent = ({ field, form = {}, handleSubmit, userId, id, avgRating, readOnly }) => {
  return (
    <Rating
      name="simple-controlled"
      value={readOnly ? avgRating : field.value}
      // style={{color:'red'}}
      disabled={readOnly}
      onChange={(event, newValue) => {
        form?.setFieldValue(field.name, newValue);
        handleSubmit(newValue);
      }}
    />
  );
};
RatingComponent.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object,
  handleSubmit: PropTypes.func,
  userId: PropTypes.string,
  id: PropTypes.string,
  avgRating: PropTypes.number,
  readOnly: PropTypes.bool,
};

export default RatingComponent;
