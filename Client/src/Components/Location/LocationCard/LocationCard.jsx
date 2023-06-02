
import { Card,CardMedia,CardContent,Typography, Button } from '@material-ui/core'
import React from 'react'
import useStyles from "./styles.js"
import  image from '../../../Images/tokyo.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.js'
const LocationCard = ({location}) => {
    const classes = useStyles();
    const lines = location.description.split(',');
    const firstThreeLines = lines.slice(0,2).join(' ,'); 
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={location.coverImage} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {location.title}
          </Typography>
          <Typography variant="body2" component="p">
            {firstThreeLines}...
          </Typography>
          <Link  to={`/destinations/${location._id}`}>
          <Button className={classes.button}>
            Read More
          </Button>
          </Link>
        </CardContent>
      </Card>
  )
}

export default LocationCard