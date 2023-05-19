
import { Card,CardMedia,CardContent,Typography, Button } from '@material-ui/core'
import React from 'react'
import useStyles from "./styles.js"
import  image from '../../../Images/tokyo.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.js'
const DestinationCard = ({destination}) => {
    const classes = useStyles();
    const lines = destination.description.split(',');
    const firstThreeLines = lines.slice(0,2).join(' ,'); 
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={destination.coverImage} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {destination.title}
          </Typography>
          <Typography variant="body2" component="p">
            {firstThreeLines}...
          </Typography>
          <Link  to={`/destinations/${destination._id}`}>
          <Button className={classes.button}>
            Read More
          </Button>
          </Link>
        </CardContent>
      </Card>
  )
}

export default DestinationCard