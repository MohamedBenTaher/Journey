import React from 'react'
import { Button, Modal, Box, Typography, Backdrop, TextField, Grid, Input } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
const EventCard = ({ event }) => {

    return (
        <Card >
            <Grid container direction='row'>
                <Grid item xs={12} lg={4}>
                    <CardMedia
                        component="img"
                        alt="Event Thumbnail"
                        image={event?.coverImage}
                    />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {event?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event?.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button component={Link} to={`/events/${event?._id}`} size="small">
                        Learn More
                        </Button>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>

    )
}

export default EventCard