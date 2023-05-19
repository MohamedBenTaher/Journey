
import { Card,CardMedia,CardContent,Typography, Button } from '@material-ui/core'
import React from 'react'
import useStyles from "./styles.js"
import  image from '../../../Images/tokyo.jpg'
const DestinationCard = ({destination}) => {
    const classes = useStyles();
    const lines = destination.description.split('\n');
    const firstThreeLines = lines.slice(0,2).join('\n'); 
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={destination.coverImage} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {destination.title}
          </Typography>
          <Typography variant="body2" component="p">
            {firstThreeLines}...
          </Typography>
          <Button className={classes.button}>
            Read More
          </Button>
        </CardContent>
      </Card>
  )
}

export default DestinationCard