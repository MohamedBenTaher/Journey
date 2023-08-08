import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  bookmarkCountry,
  cancelBookmarkCountry,
  getCountry,
} from "../../../actions/country";
import { cancelBookmarCountry } from "../../../api";
import CardCarousel from "../../CardCarousel/CardCarousel";
import DestinationCard from "../../Destination/DestinationCard/Destination";
import { getDestinationByCountry } from "../../../actions/destinations";
const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: 400,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  saveCountry: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    color: "white",
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: "bold",
  },
  subTitle: {
    marginTop: theme.spacing(2),
    fontWeight: "normal",
  },
  description: {
    marginTop: theme.spacing(2),
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
  imagesSection: {
    marginTop: theme.spacing(2),
  },
  image: {
    height: 200,
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
  },
}));

const CountryDetails = () => {
  const { country, isLoading } = useSelector((state) => state.countries);
  const {destinations}=useSelector((state)=>state.destinations)
  console.log('my destinations in the country',destinations)
  const value = useSelector((state) => state);
  console.log("continent details", country, value);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const [bookmarked, setBookmarked] = useState(false);
  const userId = user?.result?._id;
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getCountry(id));
    dispatch(getDestinationByCountry(id))
  }, [dispatch, id]);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);
  useEffect(() => {
    if (country) {
      setBookmarked(country.bookmarkedBy.includes(userId));
    }
  }, [country, userId]);
  const formatParagraph = (paragraph) => {
    const titleRegex = /^(\d+):(.*)$/; // Regex to match the title pattern with number and colon
    const matches = paragraph.match(titleRegex);

    if (matches && matches.length === 3) {
      const titleNumber = matches[1].trim();
      const titleText = matches[2].trim();
      return (
        <p style={{ textAlign: "justify" }}>
          <strong>{titleNumber}:</strong> {titleText}
        </p>
      );
    }

    return <p style={{ textAlign: "justify" }}>{paragraph}</p>;
  };

  const handleBookmark = () => {
    if (bookmarked) {
      dispatch(cancelBookmarkCountry(country?._id, userId));
    } else {
      dispatch(bookmarkCountry(country?._id, userId));
    }
    setBookmarked(!bookmarked);
  };

  return (
    <Card>
      <CardMedia className={classes.coverImage} image={country?.coverImage}>
        <IconButton
          className={classes.saveCountry}
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
        <Typography variant="h3" component="h2" className={classes.title}>
          {country?.title}
        </Typography>
        <Typography variant="h5" component="h5" className={classes.subTitle}>
          {country?.continent?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          {country?.description
            ?.split("\n")
            .map((paragraph, index) => formatParagraph(paragraph))}
        </Typography>
        <Typography variant="h6" component="h3">
          Images
        </Typography>
        <div className={classes.imagesSection}>
          <Grid container spacing={2}>
            {country?.images?.map((image, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={6}>
                <div
                  className={classes.image}
                  style={{ backgroundImage: `url(${image})` }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <CardCarousel CardComponent={DestinationCard} small={true} title={'Best cities to visit'} array={destinations}/>
      </CardContent>
    </Card>
  );
};

export default CountryDetails;
