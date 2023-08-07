import React from 'react';
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

function Hero() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.heroContainer} maxWidth={false} disableGutters>
        <Container>
          <Navbar />
          <Grid container className={classes.content}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Explore the Beauty of Journey
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
      </Paper>
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
