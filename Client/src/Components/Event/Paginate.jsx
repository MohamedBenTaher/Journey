import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../actions/events.js";

const Paginate = ({ page }) => {
  console.log("posts rd");
  const { numberOfPages } = useSelector((state) => state.events);
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/events?page=${item.page}`}
        />
      )}
    />
  );
};
export default Paginate;
