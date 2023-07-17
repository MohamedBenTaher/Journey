import React ,{useEffect,useState} from 'react';
import { Card, CardContent, CardMedia, Typography, Grid ,IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { bookmarkDestination, cancelBookmarkDestination, downvoteDestination, getDestination, upvoteDestination } from '../../../actions/destinations';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector,useDispatch } from 'react-redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import  Comments  from '../../Comment/Comments.jsx';
const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: 700,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position:'relative'
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
  description: {
    marginTop: theme.spacing(2),
  },
  voteSection: {
    marginTop: theme.spacing(2),
    width:'50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-evenly'
  },
  voteButton: {
    marginRight: theme.spacing(1),
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    cursor: 'pointer',
  },
  voteCount: {
    fontWeight: 'bold',
  },

  majorImage: {
    height: '100%', // Adjust the height of the major image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      height: '300px', 
      width:'99%'// Adjust the height for smaller screens
    },
 
  },
  image: {
    height: '200px', // Adjust the height of the grid images
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius:'8px'
  },
  otherImages:{
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  },
  description:{
    paddingBlock:'1em',
    textJustify:'auto'
  },
  saveDestination:{
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    color: 'white',
  }
}));

const DestinationDetails = () => {
  const {destination,isLoading}=useSelector((state)=>state.destinations);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [bookmarked, setBookmarked] = useState(false); // New state to track bookmarked status
  const classes = useStyles();
  const dispatch=useDispatch()
  const [bookmarks, setBookmarks] = useState(destination?.bookmarkedBy);
  const hasBoomarkedPost=destination.bookmarkedBy.find((like)=>like===user.result._id)
  const {id}=useParams()
  useEffect(()=>{
   dispatch(getDestination(id))
  },[dispatch,id])
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);
const handleUpvote = () => {
    dispatch(upvoteDestination(destination?._id, user?.result?._id));
  };

  const handleDownvote = () => {
    dispatch(downvoteDestination(destination?._id, user?.result?._id));
  };
  const handleBookmark = () => {
    if (bookmarked) {
      dispatch(cancelBookmarkDestination(destination._id, user.result._id));
    } else {
      dispatch(bookmarkDestination(destination._id, user.result._id));
    }
  };

const Bookmark=() => {
  if (destination.bookmarkedBy.length > 0) {
    return (destination && user && destination.bookmarkedBy.includes(user?.result?._id)) 
      ? (
        <BookmarkIcon style={{ color: 'white',fontSize: 32,zIndex:99 }} />      ) : (
          <BookmarkBorderIcon style={{ color: 'white',fontSize: 32,zIndex:99}} />
      );
  
}}
console.log('who bookmaraked',destination?.bookmarkedBy?.find((id)=>id===user?.result?._id))
  return (
    <>
    <Card>
          <CardMedia className={classes.coverImage} image={destination?.coverImage} >
          <IconButton className={classes.saveDestination}  onClick={handleBookmark} disabled={!user}>
                <Bookmark/>
              </IconButton>
          </CardMedia>
          <CardContent>
              <Typography variant="h2" className={classes.title}>
                  {destination?.title}
              </Typography>
              <Typography variant="body2" component="p">
                  Created: {new Date(destination?.createdAt).toLocaleString()}
              </Typography>
             <div className={classes.voteSection}>
                  {user && (
                      <div className={classes.voteButton} onClick={() => handleUpvote()}>Upvote</div>
                  )}

                  <Typography variant="body2" className={classes.voteCount}>
                      Upvotes:  {destination?.upvotes?.length}
                  </Typography>
                  {user && (
                      <div className={classes.voteButton} onClick={() => handleDownvote()}>Downvote</div>
                  )}
                  <Typography variant="body2" className={classes.voteCount}>
                      Downvotes:   {destination?.downvotes?.length}
                  </Typography>
              </div> 
              <div className={classes.description}>
                  {destination?.description.split('\n').map((paragraph, index) => (
                      <p key={index} style={{ textAlign: 'justify' }}>{paragraph}</p>
                  ))}
              </div>
            <div className={classes.imagesSection}>
            <Grid container spacing={2} direction={{ lg:'row'}} >
                
                  {/* Display the first image as the major image */}
                  {destination?.images?.length > 0 && (
                    <Grid item xs={12} md={6} lg={6} >
                      <div className={classes.majorImage} style={{ backgroundImage: `url(${destination?.images[0]})` }} />
                    </Grid>
                  )}
              
                  <Grid item container className={classes.otherImages} xs={12} md={6} lg={6}spacing={2}direction={{ xs: 'column', md: 'column',lg:'row' }} >
                  {/* Display the rest of the images in a grid */}
                  {destination?.images?.slice(1, 6).map((image, index) => (
                    <Grid key={index} item xs={12} sm={12} md={3} lg={6}>
                      <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
                    </Grid>
                  ))}
                  </Grid>
                </Grid>
              </div>
          </CardContent>
      </Card>
      {
        destination&&(
          <Card>
            <CardContent>
                <Comments entityId={id} entityType={'Destination'} user={user}/>
            </CardContent>
          </Card>
        )
    }      
          </>
  );
};

export default DestinationDetails;