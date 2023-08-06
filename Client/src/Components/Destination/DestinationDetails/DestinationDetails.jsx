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
import { useDispatch, useSelector } from "react-redux";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useParams } from "react-router-dom";
import {
  bookmarkDestination,
  cancelBookmarkDestination,
  downvoteDestination,
  getDestination,
  upvoteDestination,
} from "../../../actions/destinations";
import Comments from "../../Comment/Comments";

const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: 700,
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
    textAlign: "justify",
  },
  voteSection: {
    marginTop: theme.spacing(2),
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
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
  majorImage: {
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
      width: "99%",
    },
  },
  image: {
    height: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
  },
  otherImages: {
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  saveDestination: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    color: "white",
  },
}));

const DestinationDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const userId = user?.result?._id;

  const dispatch = useDispatch();
  const { destination, isLoading } = useSelector((state) => state.destinations);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    dispatch(getDestination(id));
  }, [dispatch, id]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  useEffect(() => {
    if (destination) {
      setBookmarked(destination.bookmarkedBy.includes(userId));
    }
  }, [destination, userId]);

  const handleUpvote = () => {
    dispatch(upvoteDestination(destination?._id, userId));
  };

  const handleDownvote = () => {
    dispatch(downvoteDestination(destination?._id, userId));
  };

  const handleBookmark = () => {
    if (bookmarked) {
      dispatch(cancelBookmarkDestination(destination?._id, userId));
    } else {
      dispatch(bookmarkDestination(destination?._id, userId));
    }
    setBookmarked(!bookmarked);
  };

  return (
    <>
      <CardMedia className={classes.coverImage} image={destination?.coverImage}>
        <IconButton
          className={classes.saveDestination}
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
        <Typography variant="h2" className={classes.title}>
          {destination?.title}
        </Typography>
        <Typography variant="body2" component="p">
          Created: {new Date(destination?.createdAt).toLocaleString()}
        </Typography>
        <div className={classes.voteSection}>
          {user && (
            <div className={classes.voteButton} onClick={handleUpvote}>
              Upvote
            </div>
          )}
          <Typography variant="body2" className={classes.voteCount}>
            Upvotes: {destination?.upvotes?.length}
          </Typography>
          {user && (
            <div className={classes.voteButton} onClick={handleDownvote}>
              Downvote
            </div>
          )}
          <Typography variant="body2" className={classes.voteCount}>
            Downvotes: {destination?.downvotes?.length}
          </Typography>
        </div>
        <div className={classes.description}>
          {destination?.description.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className={classes.imagesSection}>
          <Grid container spacing={2} direction={{ lg: "row" }}>
            {destination?.images?.length > 0 && (
              <Grid item xs={12} md={6} lg={6}>
                <div
                  className={classes.majorImage}
                  style={{ backgroundImage: `url(${destination?.images[0]})` }}
                />
              </Grid>
            )}
            <Grid
              item
              container
              className={classes.otherImages}
              xs={12}
              md={6}
              lg={6}
              spacing={2}
              direction={{ xs: "column", md: "column", lg: "row" }}
            >
              {destination?.images?.slice(1, 6).map((image, index) => (
                <Grid key={index} item xs={12} sm={12} md={3} lg={6}>
                  <div
                    className={classes.image}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      </CardContent>
      {destination && (
        <Card>
          <CardContent>
            <Comments entityId={id} entityType="Destination" user={user} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DestinationDetails;
