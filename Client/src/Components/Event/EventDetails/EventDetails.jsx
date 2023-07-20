import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { attendEvent, bookmarkEvent, cancelBookmarkEvent, cancelEvent, getEvent } from '../../../actions/events'
import useStyles from "./styles.js"
import { Button, Card,CardContent,Grid,Typography,IconButton } from '@material-ui/core'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PlaceIcon from '@mui/icons-material/Place';
import TagIcon from '@mui/icons-material/Tag';
import PercentIcon from '@mui/icons-material/Percent';
import BackpackIcon from '@mui/icons-material/Backpack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import moment from 'moment/moment'
const EventDetails = ({}) => {
    const classes=useStyles()
    const dispatch=useDispatch()
    const {id}=useParams();
    const {event,isLoading}=useSelector((state)=>state.events)
    const [user,setUser]=useState(localStorage.getItem('profile'))
    const userId = user?.result?._id;
    const userAttending=event?.attendants?.find((item)=>item===user?.result?._id)
    const [bookmarked, setBookmarked] = useState(false);
    useEffect(()=>{
        if(id){
            dispatch(getEvent(id))
        }
    },[id,dispatch])
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);
    useEffect(() => {
      if (event) {
        console.log('containing event',event.bookmarkedBy,userId,event.bookmarkedBy.includes(userId))
      
        setBookmarked(event.bookmarkedBy.includes(userId));
      }
    }, [event, userId]);
    const handleBooking=()=>{
      dispatch(attendEvent(id,user?.result?._id))
    }
    const cancelBooking=()=>{
      dispatch(cancelEvent(id,user?.result?._id))
    }
    const handleBookmark = () => {
      if (bookmarked) {
        dispatch(cancelBookmarkEvent(event?._id, userId));
      } else {
        dispatch(bookmarkEvent(event?._id, userId));
      }
      setBookmarked(!bookmarked);
    };
  return(
    <><Card className={classes.card}>
        <div className={classes.imageSection}>
      
      <IconButton className={classes.saveEvent} onClick={handleBookmark} disabled={!user}>
                {bookmarked ? (
                  <BookmarkIcon style={{ color: 'white',fontSize: 32,zIndex:99 }} />
                ) : (
                  <BookmarkBorderIcon style={{ color: 'white',fontSize: 32,zIndex:99}} />
                )}
      </IconButton>
      <img src={event?.coverImage} alt="Event Cover" className={classes.coverImage} />
      </div>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {event?.title}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {event?.description}
        </Typography>
        <Grid container>
          <Grid lg={6} >
            <div className={classes.infoItem}>
             <CalendarMonthIcon/>
              <Typography variant="subtitle1" color="textSecondary">
                Start Date:
              </Typography>
              <Typography variant="body1">{moment(event?.startDate).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            </div>
            <div className={classes.infoItem}>
            <CalendarMonthIcon/>
              <Typography variant="subtitle1" color="textSecondary">
                End Date:
              </Typography>
              <Typography variant="body1">{moment(event?.endDate).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
              </div>
              <div className={classes.infoItem}>
              <PeopleAltIcon/>
              <Typography variant="body1" color="textSecondary">
                Places Left :
              </Typography>
              <Typography variant="body1">{event?.numberOfPlaces - event?.attendants.length}</Typography>
              </div>
             
          
            <div className={classes.infoItem}>
              <PlaceIcon/>
              <Typography variant="subtitle1" color="textSecondary">
                Location:
              </Typography>
              <Typography variant="body1">{event?.location}</Typography>
            </div>
            <div className={classes.infoItem}>
              <BackpackIcon/>
              <Typography variant="subtitle1" color="textSecondary">
                Organizer:
              </Typography>
              <Typography variant="body1">{event?.creator?.name}</Typography>
            </div>
          </Grid>
          <Grid lg={6}>
            <div className={classes.infoItem}>
              <TagIcon/>
              <Typography variant="subtitle1" color="textSecondary">
                Tags:
              </Typography>
              <Typography variant="body1">{event?.tags?.join(', ')}</Typography>
            </div>
            <div className={classes.infoItem}>
              <PeopleAltIcon/>
              <Typography variant="subtitle1" color="textSecondary">
                Number of Places:
              </Typography>
              <Typography variant="body1">{event?.numberOfPlaces}</Typography>
            </div>
            <div className={classes.infoItem}>
              <LocalOfferIcon/>
              <Typography variant="subtitle1" color="textSecondary">
                Event Fee:
              </Typography>
              <Typography variant="body1">{event?.eventFee}</Typography>
            </div>
            <div className={classes.infoItem}>
              <PercentIcon/>
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