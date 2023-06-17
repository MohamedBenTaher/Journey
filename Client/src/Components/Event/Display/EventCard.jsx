import React from 'react'
import { Button, Modal, Box, Typography, Backdrop, TextField, Grid, Input } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import useStyles from "./styles.js"
const EventCard = ({ event }) => {
    console.log(event)
    const classes=useStyles();
    return (
        <Card className={classes.card}>
            <Grid container direction='row'>
                <Grid item xs={12} lg={4}>
                    <CardMedia
                        component="img"
                        alt="Event Thumbnail"
                        image={event?.coverImage}
                    />
                </Grid>
                <Grid item xs={12} lg={8}>
                 <Grid>
                 <Grid item lg={6}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {event?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event?.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Placed Left :{event?.numberOfPlaces-event?.attendants.length}
                        </Typography>
                        <Typography  variant="body2" color="text.secondary">Event fee:{event?.eventFee}</Typography>
                        <Typography  variant="body2" color="text.secondary">Organized by:{event?.creator?.name}</Typography>
                    </CardContent>
                    </Grid>
                    <Grid>
                    <CardActions  item lg={6}>
                        <Button size="small">Share</Button>
                        <Button component={Link} to={`/events/${event?._id}`} size="small">
                        Learn More
                        </Button>
                    </CardActions>
                    </Grid> 
                    </Grid>
                </Grid>
            </Grid>
        </Card>

    )
}

export default EventCard