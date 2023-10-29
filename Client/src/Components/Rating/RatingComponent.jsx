import { Rating } from '@mui/material';
import React from 'react';

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

export default RatingComponent;
