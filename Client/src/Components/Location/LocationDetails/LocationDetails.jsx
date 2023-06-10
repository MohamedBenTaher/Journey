import React ,{useEffect,useState} from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { downvoteDestination, getDestination, upvoteDestination } from '../../../actions/destinations';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector,useDispatch } from 'react-redux';
import  Comments  from '../../Comment/Comments.jsx';
import { getLocation } from '../../../actions/locations';
const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: 400,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  imagesSection: {
    marginTop: theme.spacing(2),
  },
  image: {
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const LocationDetails = () => {
  const {location,isLoading}=useSelector((state)=>state.locations);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const dispatch=useDispatch()
  const {id}=useParams()
  useEffect(()=>{
   dispatch(getLocation(id))
  },[dispatch,id])
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);
// const handleUpvote = () => {
//     dispatch(upvoteDestination(location?._id, user?._id));
//   };

//   const handleDownvote = () => {
//     dispatch(downvoteDestination(location?._id, user?._id));
//   };

  return (
    <><Card>
          <CardMedia className={classes.coverImage} image={location?.coverImage} />
          <CardContent>
              <Typography variant="h5" className={classes.title}>
                  {location?.title}
              </Typography>
              <Typography variant="body2" component="p">
                  Created: {new Date(location?.createdAt).toLocaleString()}
              </Typography>
              <div className={classes.voteSection}>
                  {user && (
                      <div className={classes.voteButton} onClick={() => handleUpvote()}>Upvote</div>
                  )}

                  <Typography variant="body2" className={classes.voteCount}>
                      Upvotes:  {location?.upvotes?.length}
                  </Typography>
                  {user && (
                      <div className={classes.voteButton} onClick={() => handleDownvote()}>Downvote</div>
                  )}
                  <Typography variant="body2" className={classes.voteCount}>
                      Downvotes:   {location?.downvotes?.length}
                  </Typography>
              </div>
              <div>
                  {location?.description.split('\n').map((paragraph, index) => (
                      <p key={index} style={{ textAlign: 'justify' }}>{paragraph}</p>
                  ))}
              </div>

              <div className={classes.imagesSection}>
                  <Grid container spacing={2}>
                      {location?.images.map((image, index) => (
                          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                              <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
                          </Grid>
                      ))}
                  </Grid>
              </div>
          </CardContent>
      </Card>
      {
        location&&(
          <Card>
            <CardContent>
                <Comments entityId={id} entityType={'Destination'} user={user||{}}/>
            </CardContent>
          </Card>
        )
    }      
          </>
  );
};

export default LocationDetails;