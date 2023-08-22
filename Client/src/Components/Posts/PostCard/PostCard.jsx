import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles.js";
import image from "../../../Images/tokyo.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.js";
const PostCard = ({ item, small,profile }) => {
  const classes = useStyles();
  const lines = item?.message?.split(",");
  const firstThreeLines = lines?.slice(0, 2).join(" ,");
  return (
    <Card className={profile?classes.profile:classes.smallCard}>
      <CardMedia className={classes.media} image={item?.selectedFile} />
      <CardContent className={classes.content}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.title}
        >
          {item?.title}
        </Typography>
        <Typography variant="body2" component="p">
          {firstThreeLines}...
        </Typography>
        <Link to={`/stories/${item?._id}`}>
          <Button className={classes.button}>Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostCard;
