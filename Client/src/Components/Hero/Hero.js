import React ,{useState,useEffect} from 'react';
import {
  Grid,
  Container,
  Typography,
  Paper,
  CssBaseline,
} from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import useStyles from './styles.js';
import SearchBar from '../Home/SearchBar';
import axios from 'axios';
import BgImage from '../../assets/images/bg-image.png'
function Hero() {
  const classes = useStyles();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
    // Function to fetch a random image from Unsplash
    const fetchRandomImage = async () => {
  
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            params: {
              client_id: '0nlqCJ4DGMwDJizUMB9iQdSdXmfk5dNx97AkNESzSv0', // Replace with your Unsplash API key
              orientation: 'landscape', // Adjust orientation as needed
            },
          }
        );

        // Set the fetched image URL as the background
        setBackgroundImage(response.data.urls.regular);
        setIsLoading(false);
        if(!backgroundImage){
        setBackgroundImage(BgImage);
        console.error('Error fetching image from Unsplash:', error);
        }
      
    };
    fetchRandomImage();

    const interval = setInterval(fetchRandomImage, 500000000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <header className={classes.heroContainer} maxWidth={false} disableGutters  style={{
          margin: 0,
          padding: 0,
          height: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 0.5s ease-in-out',
          opacity: isLoading ? 0 : 1, 
        }}>
        <Container>
          <Navbar />
          <Grid container className={classes.content}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Explore the beauty of the journey
              </Typography>
              <Grid>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  Travelling is not always about running away from things,
                  sometimes it's about running to what you truly want
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container className={classes.SearchBar}>
            <SearchBar />
          </Grid>
        </Container>
      </header>
      <Container className={classes.Devider} maxWidth={false} disableGutters>
        <Grid
          container
          direction={{
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
          }}
          className={classes.deviderContent}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h2" className={classes.firstTitle}>
              Popular Destinations
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item container>
              <Typography variant="h6" className={classes.secondTitle}>
                1000+ Destinations
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.body}>
                Join our community and discover more than 1000 destination, to
                the most beautiful places around the world,find hidden gems rare
                locations and enjoy the best experience in your tours.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Hero;
