import React from 'react';
import { Paper, Grid, Card, Container, Box } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import useStyles from './styles';
import { Skeleton } from '@mui/material';


const CardCarousel = ({ array, CardComponent, small, title, profile }) => {
  const classes = useStyles();
  const sliderItems = array.length > 3 ? 3 : array.length;
  const items = [];
  for (let i = 0; i < array.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Card raised className={classes.banner} key={i.toString()}>
          <Grid container spacing={3} className={classes.bannerGrid} xs={12}>
            {array.slice(i, i + sliderItems).map((item, index) => (
              <Grid item key={index} lg={4} sm={4} xs={4} md={4} sx={{margin:'1em'}}>
                <CardComponent item={item} small={small} profile={profile} />
              </Grid>
            ))}
          </Grid>
        </Card>
      );
    }
  }
  return (
    <Box container className={classes.paper}>
      <Carousel animation="slide" autoPlay={false} cycleNavigation timeout={300} sx={{ boxShadow: 'none'}} >
        {items}
      </Carousel>
    </Box>
  );
};

export default CardCarousel;