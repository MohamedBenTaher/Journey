import {
 Grid, Container, List, ListItem, Typography, Divider 
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import memories from '../../Images/journey.png';
import useStyles from './styles.js';

function Footer() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth={false} disableGutters>
      <Grid container className={classes.content}>
        <Grid item xs={12} md={12} lg={6} className={classes.Brand}>
          <img src={memories} alt="Journey" className={classes.image} />
          <Typography variant="body1" className={classes.text}>
            Travelling is not always about running away from things, sometimes it's about running to
            what you truly want,here at journey we offer a great touring guide experience, with a
            large and supportive community
          </Typography>
        </Grid>
        <Grid item container xs={12} md={12} lg={6} className={classes.links}>
          <Grid item className={classes.About} xs={12} md={12} lg={4}>
            <Typography variant="h6" className={classes.title}>
              About
            </Typography>
            <List className={classes.list}>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  {' '}
                  How to book
                </Link>
              </ListItem>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  {' '}
                  Contact us
                </Link>
              </ListItem>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  {' '}
                  Help Center
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item className={classes.Products} xs={12} md={12} lg={4}>
            <Typography variant="h6" className={classes.title}>
              Products
            </Typography>
            <List className={classes.list}>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  destination
                </Link>
              </ListItem>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  flight
                </Link>
              </ListItem>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  logding
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item className={classes.Social} xs={12} md={12} lg={4}>
            <Typography variant="h6" className={classes.title}>
              Social
            </Typography>
            <List className={classes.list}>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  Facebook
                </Link>
              </ListItem>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  twitter
                </Link>
              </ListItem>
              <ListItem className={classes.ListItem}>
                <Link to="/" className={classes.link}>
                  instagram
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Divider className={classes.Divider} />
      </Grid>
      <Grid container className={classes.gutter}>
        {/* <Grid item xs={12} sm={6} md={6} > */}
        <Typography className={classes.gutterText}>Journey</Typography>
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={6} md={6}> */}
        <Typography className={classes.gutterText}>copyright@2022</Typography>
        {/* </Grid> */}
      </Grid>
    </Container>
  );
}

export default Footer;
