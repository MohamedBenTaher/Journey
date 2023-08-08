import { Grid, Paper, Typography } from '@material-ui/core'
import React, { Children } from 'react'
import Carousel from 'react-material-ui-carousel'

const CardCarousel = ({array,CardComponent,small,title}) => {
  return (
     <Paper>
      <Typography variant="h3">{title}</Typography>
      {array && array.length > 0 ? (
        <Carousel
        animation="slide"
        swipe={true}
        navButtonsAlwaysVisible={true}
        >
          <Grid container >
          {array.map((item) => {
            return(
              <Grid item xs={12} sm={6} md={4} lg={3}>
                 <CardComponent key={item._id} item={item} small={small} />
             </Grid>
            )
          })}
          </Grid>
        </Carousel>
      ) : (
        <Typography variant="body2">No known locations found.</Typography>
      )}
    </Paper>
  )
}

export default CardCarousel