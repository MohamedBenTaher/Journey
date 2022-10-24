import React from 'react'
import { Grid,Container,Typography,Paper,CssBaseline } from '@material-ui/core'
import Navbar from '../Navbar/Navbar'
import useStyles from './styles.js'
function Hero() {
  const classes=useStyles();
  return (
    <Paper className={classes.heroContainer}  maxWidth={false} disableGutters>
    <Container >
      <Navbar />
      <Grid container>
      <Grid item>
       <Typography variant='h2' className={classes.title}>
        Explore the Beauty of Journey
       </Typography>
       <Grid>
        <Typography variant='subtitle1' className={classes.subtitle}>
          Travelling is not always about running away from things, 
          sometimes it's about running to what you truly want
        </Typography>
       </Grid>
      </Grid>
      </Grid>
    </Container>
    </Paper>
  )
}

export default Hero