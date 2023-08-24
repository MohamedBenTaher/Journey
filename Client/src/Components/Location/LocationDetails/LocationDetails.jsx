import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  downvoteDestination,
  getDestination,
  upvoteDestination,
} from "../../../actions/destinations";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import Comments from "../../Comment/Comments.jsx";
import {
  bookmarkLocation,
  cancelBookmarkLocation,
  getLocation,
  rateLocation,
} from "../../../actions/locations";
import { Rating } from "@mui/material";
import RatingComponent from "../../Rating/RatingComponent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import * as Yup from "yup";
const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: 400,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: "bold",
  },
  description: {
    marginTop: theme.spacing(2),
  },
  voteSection: {
    marginTop: theme.spacing(2),
    // width:'50%',
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  voteButton: {
    marginRight: theme.spacing(1),
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    cursor: "pointer",
  },
  voteCount: {
    fontWeight: "bold",
  },
  imagesSection: {
    marginTop: theme.spacing(2),
  },
  image: {
    height: 200,
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: theme.spacing(2),
  },
  saveLocation: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    color: "white",
  },
}));

const LocationDetails = () => {
  const { location, isLoading } = useSelector((state) => state.locations);
  const user = useSelector((state)=>state.auth.user)
  const classes = useStyles();
  const userId = user?.result?._id;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    dispatch(getLocation(id));
    console.log("my locations", location);
  }, [dispatch, id]);

  useEffect(() => {
    if (location) {
      setBookmarked(location.bookmarkedBy.includes(userId));
    }
  }, [location, userId]);
  const handleSubmit = (avgRating) => {
    if (user) dispatch(rateLocation(id, user?.result._id, avgRating));
  };

  const locationRating = location?.avgRating.find(
    (rating) => rating.id === user?.result?._id,
  );

  const calculateAverageRating = () => {
    if (!location?.avgRating || location?.avgRating.length === 0) {
      return 0;
    }

    const numericRatings = location?.avgRating.filter(
      (rating) => typeof rating.rating === "number",
    );
    if (numericRatings.length === 0) {
      return 0;
    }

    const totalRating = numericRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0,
    );
    const averageRating = totalRating / numericRatings.length;

    return averageRating;
  };
  const averageRating = calculateAverageRating();
  const initialValues = {
    avgRating: location?.avgRating?.length > 0 ? averageRating : 0,
  };
  const validationSchema = Yup.object().shape({
    avgRating: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Rating is required"),
  });
  const handleBookmark = () => {
    if (bookmarked) {
      dispatch(cancelBookmarkLocation(location?._id, userId));
    } else {
      dispatch(bookmarkLocation(location?._id, userId));
    }
    setBookmarked(!bookmarked);
  };
  return (
    <>
      <CardMedia className={classes.coverImage} image={location?.coverImage}>
        <IconButton
          className={classes.saveLocation}
          onClick={handleBookmark}
          disabled={!user}
        >
          {bookmarked ? (
            <BookmarkIcon
              style={{ color: "white", fontSize: 32, zIndex: 99 }}
            />
          ) : (
            <BookmarkBorderIcon
              style={{ color: "white", fontSize: 32, zIndex: 99 }}
            />
          )}
        </IconButton>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
          {location?.title}
        </Typography>
        <Typography variant="body2" component="p">
          Created: {new Date(location?.createdAt).toLocaleString()}
        </Typography>
        <div className={classes.voteSection}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(values) => (
              <Form>
                <Field
                  name="avgRating"
                  fullWidth
                  component={RatingComponent}
                  handleSubmit={handleSubmit}
                  userId={user?.result?._id}
                  id={id}
                  avgRating={values.avgRating}
                />
              </Form>
            )}
          </Formik>
          <div>({averageRating})</div>
        </div>

        <div>
          {location?.description.split("\n").map((paragraph, index) => (
            <p key={index} style={{ textAlign: "justify" }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={classes.imagesSection}>
          <Grid container spacing={2}>
            {location?.images.map((image, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <div
                  className={classes.image}
                  style={{ backgroundImage: `url(${image})` }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </CardContent>

      {location && (
        <Card>
          <CardContent>
            <Comments entityId={id} entityType={"Destination"} user={user} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LocationDetails;
