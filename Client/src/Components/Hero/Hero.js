import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Paper, CssBaseline } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import useStyles from './styles.js';
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios';
import BgImage from '../../assets/images/bg-image.png';
function Hero() {
  const classes = useStyles();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Function to fetch a random image from Unsplash
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: '0nlqCJ4DGMwDJizUMB9iQdSdXmfk5dNx97AkNESzSv0',
            orientation: 'landscape',
          },
        });

        setBackgroundImage(response.data.urls.regular);
      } catch (error) {
        console.error('Error fetching image from Unsplash', error);
        setBackgroundImage(BgImage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRandomImage();

    const interval = setInterval(fetchRandomImage, 500000000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <header
        className={classes.heroContainer}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isLoading ? 0 : 1,
        }}>
        <Navbar />
        <Grid container className={classes.content}>
          <Grid item>
            <Typography variant="h2" className={classes.title}>
              Explore the beauty of the journey
            </Typography>
            <Grid>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Travelling is not always about running away from things, sometimes it&apos;s about
                running to what you truly want
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container className={classes.SearchBar}>
          <SearchBar />
        </Grid>
      </header>
    </>
  );
}

export default Hero;
