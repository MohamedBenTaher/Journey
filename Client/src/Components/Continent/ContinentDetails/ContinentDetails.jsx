import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography ,Grid} from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getContinent } from '../../../actions/continent';
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
    borderRadius:'16px'
  },
}));

const ContinentDetails = () => {
  const {continents,isLoading}=useSelector((state)=>state.continents);
  const value=useSelector((state)=>state)
  console.log('continent details',continents,value)
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const dispatch=useDispatch()
  const {id}=useParams()
  useEffect(()=>{
   dispatch(getContinent(id))
  },[dispatch,id])
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

  return (
    <Card >
      <CardMedia className={classes.coverImage} image={continents?.coverImage} title={continents?.name} />
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {continents?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {continents?.description?.split('\n').map((paragraph, index) => (
                      <p key={index} style={{ textAlign: 'justify' }}>{paragraph}</p>
                  ))}
        </Typography>
        <Typography variant="h6" component="h3">
          Images
        </Typography>
        <div className={classes.imagesSection}>
        <Grid container spacing={2}>
          {continents?.images?.map((image, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={6}>
            <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
          </Grid>
      ))}
        </Grid>
        </div>
        
      </CardContent>
    </Card>
  );
};

export default ContinentDetails;