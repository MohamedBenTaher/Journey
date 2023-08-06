import { Rating } from "@mui/material";
import React from "react";

const RatingComponent = ({
  field,
  form: { setFieldValue },
  handleSubmit,
  userId,
  id,
  avgRating,
}) => {
  return (
    <Rating
      name="simple-controlled"
      value={field.value}
      onChange={(event, newValue) => {
        setFieldValue(field.name, newValue);
        handleSubmit(newValue);
      }}
    />
  );
};

export default RatingComponent;
