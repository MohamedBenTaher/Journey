import React, { useEffect } from "react";
import { Button, Modal, Box, Typography, Backdrop, TextField, Grid, Input } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EventCard from './Display/EventCard';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from "../../actions/events";
import NavbarSecondary from "../Navbar/NavbarSecondary";

const Events = () => {
    const { events, isLoading } = useSelector((state) => state.events);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEvents(1))
    }, [])
    console.log(typeof events, events)
    return (
        <><Link to={'/events/create'}>
            <Button variant="outlined" color="primary" onClick={() => { } }> Add a new Event </Button>
        </Link><NavbarSecondary /><Grid>
                {events ? events?.map((event) => (
                    <EventCard title={event.title} desciption={event.description} img={event?.selectedFile} />
                )) :
                    (<Typography>
                        no events
                    </Typography>)}
            </Grid><EventCard /></>
      
    )
}

export default Events