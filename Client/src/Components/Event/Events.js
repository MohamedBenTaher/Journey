import React, { useEffect } from "react";
import { Button, Modal, Box, Typography, Backdrop, TextField, Grid, Input } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EventCard from './Display/EventCard';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from "../../actions/events";
import useStyles from "./styles.js"
const Events = () => {
    const { events, isLoading } = useSelector((state) => state.events);
    const classes=useStyles()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEvents(1))
    }, [])
    console.log(typeof events, events)
    return (
        <><Link to={'/events/create'}>
            <Button variant="outlined" color="primary" onClick={() => { } }> Add a new Event </Button>
        </Link>
        <Grid container spacing={3} className={classes.events} >
                {events ? events?.map((event) => (
                    <Grid item xs={12}>
                    <EventCard event={event}/>
                    </Grid>
                )) :
                    (<Typography>
                        no events
                    </Typography>)}
            </Grid></>
      
    )
}

export default Events