import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { getEvent } from '../../../actions/events'
import useStyles from "./styles.js"
import { Card,CardContent,Typography } from '@material-ui/core'

const EventDetails = ({}) => {
    const classes=useStyles()
    const dispatch=useDispatch()
    const {id}=useParams()
    const {event,isLoading}=useSelector((state)=>state.events)
    useEffect(()=>{
        if(id){
            dispatch(getEvent(id))
        }
    })
  return(
    <Card className={classes.card}>
      <img src={event?.coverImage} alt="Event Cover" className={classes.coverImage} />
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {event?.title}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {event?.description}
        </Typography>
        <div className={classes.infoItem}>
          <Typography variant="subtitle1" color="textSecondary">
            Start Date:
          </Typography>
          <Typography variant="body1">{event?.startDate}</Typography>
        </div>
        <div className={classes.infoItem}>
          <Typography variant="subtitle1" color="textSecondary">
            End Date:
          </Typography>
          <Typography variant="body1">{event?.endDate}</Typography>
        </div>
        <div className={classes.infoItem}>
          <Typography variant="subtitle1" color="textSecondary">
            Location:
          </Typography>
          <Typography variant="body1">{event?.location}</Typography>
        </div>
        <div className={classes.infoItem}>
          <Typography variant="subtitle1" color="textSecondary">
            Creator:
          </Typography>
          <Typography variant="body1">{event?.creator.name}</Typography>
        </div>
        <div className={classes.infoItem}>
          <Typography variant="subtitle1" color="textSecondary">
            Tags:
          </Typography>
          <Typography variant="body1">{event?.tags.join(', ')}</Typography>
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
          <Typography variant="body1">{event?.discountRate}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventDetails