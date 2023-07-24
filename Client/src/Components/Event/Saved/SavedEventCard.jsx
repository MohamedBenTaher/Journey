
import { Card,CardMedia,CardContent,Typography, Button } from '@material-ui/core'
import React from 'react'
import useStyles from "./styles.js"
import  image from '../../../Images/tokyo.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.js'
import picture from '../../../Images/picture.png'
const SavedEventCard = ({event,small}) => {
    const classes = useStyles();
    const lines = event.description.split(',');
    const firstThreeLines = lines.slice(0,2).join(' ,'); 
    return (
      <Card className={classes.smallCard}>
        <CardMedia className={classes.media} image={event.coverImage} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" className={event.coverImage ? classes.title:classes.noImageTitle}>
            {event.title}
          </Typography>
          <Typography variant="body2" component="p" className={!event.coverImage ? classes.noImageDesctiption:null}>
            {firstThreeLines}...
          </Typography>
          <Link  to={`/events/${location._id}`}>
          <Button className={event.coverImage?classes.button:classes.buttonNoImage}>
            Read More
          </Button>
          </Link>
        </CardContent>
      </Card>
  )
}

export default SavedEventCard