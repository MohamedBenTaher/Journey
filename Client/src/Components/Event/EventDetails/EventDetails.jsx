import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { attendEvent, cancelEvent, getEvent } from '../../../actions/events'
import useStyles from "./styles.js"
import { Button, Card,CardContent,Grid,Typography } from '@material-ui/core'
import moment from 'moment/moment'
const EventDetails = ({}) => {
    const classes=useStyles()
    const dispatch=useDispatch()
    const {id}=useParams()
    const {event,isLoading}=useSelector((state)=>state.events)
    const [user,setUser]=useState(localStorage.getItem('profile'))
    const userAttending=event?.attendants?.find((item)=>item===user?.result?._id)
    useEffect(()=>{
        if(id){
            dispatch(getEvent(id))
        }
    },[id,dispatch])
    const handleBooking=()=>{
      dispatch(attendEvent(id,user?.result?._id))
    }
    const cancelBooking=()=>{
      dispatch(cancelEvent(id,user?.result?._id))
    }
  return(
    <><Card className={classes.card}>
      <img src={event?.coverImage} alt="Event Cover" className={classes.coverImage} />
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {event?.title}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {event?.description}
        </Typography>
        <Grid container>
          <Grid lg={6}>
            <div className={classes.infoItem}>
              <Typography variant="subtitle1" color="textSecondary">
                Start Date:
              </Typography>
              <Typography variant="body1">{moment(event?.startDate).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="subtitle1" color="textSecondary">
                End Date:
              </Typography>

              <Typography variant="body1">{moment(event?.endDate).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
              <Typography variant="body1" color="textSecondary">
                Places Left :
              </Typography>
              <Typography variant="body1">{event?.numberOfPlaces - event?.attendants.length}</Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="subtitle1" color="textSecondary">
                Location:
              </Typography>
              <Typography variant="body1">{event?.location}</Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="subtitle1" color="textSecondary">
                Organizer:
              </Typography>
              <Typography variant="body1">{event?.creator?.name}</Typography>
            </div>
          </Grid>
          <Grid lg={6}>
            <div className={classes.infoItem}>
              <Typography variant="subtitle1" color="textSecondary">
                Tags:
              </Typography>
              <Typography variant="body1">{event?.tags?.join(', ')}</Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="subtitle1" color="textSecondary">
                Number of Places:
              </Typography>
              <Typography variant="body1">{event?.numberOfPlaces}</Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="subtitle1" color="textSecondary">
                Event Fee:
              </Typography>
              <Typography variant="body1">{event?.eventFee}</Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="subtitle1" color="textSecondary">
                Discount Rate:
              </Typography>
              <Typography variant="body1">{event?.discountRate}%</Typography>
            </div>

          </Grid>
        </Grid>
        <Button onClick={() => userAttending ? cancelBooking() : handleBooking()} fullWidth>
          {userAttending ? 'Book Now' : 'Cancel booking'}
        </Button>
      </CardContent>
    </Card></>
  )
}

export default EventDetails