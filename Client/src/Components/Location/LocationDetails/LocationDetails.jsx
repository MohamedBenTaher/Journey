import React ,{useEffect,useState} from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { downvoteDestination, getDestination, upvoteDestination } from '../../../actions/destinations';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector,useDispatch } from 'react-redux';
import  Comments  from '../../Comment/Comments.jsx';
import { getLocation, rateLocation } from '../../../actions/locations';
import { Rating } from '@mui/material';
import RatingComponent from '../../Rating/RatingComponent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
    // width:'50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'start'
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
   console.log('my locations',location)
  },[dispatch,id])
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
    console.log( user?.result._id)

   
  }, []);
const handleSubmit =  (avgRating) => {
  // Handle form submission here
  
  console.log('my arguments',id,user?.result._id,avgRating)
  dispatch(rateLocation(id,user?.result._id,avgRating))
  console.log('found it ', location?.avgRating.find((rating) => rating.id === user?.result._id).rating )
};
if(!user){
  return null
}
const locationRating=location?.avgRating.find((rating) => rating.id === user.result._id)
const initialValues = {
  avgRating: locationRating?locationRating.rating: 0,
};
const calculateAverageRating = () => {
  if (!location?.avgRating || location.avgRating.length === 0) {
    return 0;
  }

  const numericRatings = location.avgRating.filter(rating => typeof rating.rating === 'number');
  if (numericRatings.length === 0) {
    return 0;
  }

  const totalRating = numericRatings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = totalRating / numericRatings.length;

  return averageRating;
};
const averageRating = calculateAverageRating();
console.log('my average',averageRating)
console.log('my location',location)
console.log('my initial values',initialValues)
const validationSchema = Yup.object().shape({
  avgRating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .required('Rating is required'),
});
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
                          <Formik
                          enableReinitialize
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}
                        >
                          {(values)=>(
                          <Form>
                            <Field name="avgRating"  fullWidth component={RatingComponent} handleSubmit={handleSubmit}userId={user.result._id} id={id} avgRating={values.avgRating}/>
                          </Form>)}
                        </Formik>
                  )}
                  <div>({averageRating})</div>
                  
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