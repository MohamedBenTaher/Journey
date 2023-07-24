import React ,{useState,useEffect} from 'react'
import { Button, Modal, Box, Typography, Backdrop, TextField, Grid, Input, IconButton } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import useStyles from "./styles.js"
import { likeEvent } from '../../../actions/events.js'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useDispatch } from 'react-redux';
const EventCard = ({ event ,userId,small}) => {
    const [likes, setLikes] = useState(event?.likedBy);
    const [liked, setLiked] = useState(false);
    const dispatch=useDispatch()
    console.log(event)
    const handleLike = async () => {      
          try {
         dispatch(likeEvent(event._id, userId));
         setLiked(!liked);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        if (event) {
          setLiked(event.likedBy.includes(userId));
        }
      }, [event, userId]);
    const classes=useStyles();
     const Likes = () => {
    if (likes.length > 0 && !small) {
      return  liked ?
        ( <><FavoriteOutlinedIcon style={{color:'white'}}/></>)
        :
        (<><FavoriteBorderOutlinedIcon style={{color:'white'}} /></>)
        }
        return   <><FavoriteBorderOutlinedIcon style={{color:'white'}} /></>
    }
    return (
        <Card className={classes.card}>
            <Grid container direction='row'>
                <Grid item xs={12} lg={4}>
                    <CardMedia
                        component="img"
                        alt="Event Thumbnail"
                        image={event?.coverImage}
                    />
            <div  className={classes.likeButton} >
                    <IconButton className={classes.likeButton} onClick={handleLike} disabled={!userId || small}>
                       <Likes/>
                    </IconButton>
            </div>
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