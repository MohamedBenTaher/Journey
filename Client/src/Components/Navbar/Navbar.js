import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
  Grid
} from '@material-ui/core';
import useStyles from './styles.js';
import memories from '../../Images/journey.png';
import title from '../../Images/title.png';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decoded = decode(token);
      if (decode.exp * 1000 < new Date().getTime()) dispatch({ type: 'LOGOUT' });
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  const Logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AppBar
      className={classes.appBar}
      position="static"
      style={{ background: 'transparent', boxShadow: 'none' }}
    >
      <Grid className={classes.brandContainer}>
        <Link to="/">
          {/* <img className={classes.image} src={memories} alt="Journey" height="60" /> */}
          <Typography variant="h2" className={classes.title}>
            Journey
          </Typography>
          {/* <img  src={title} alt="Journey" height="50"/> */}
        </Link>
        {isMobile && (
          <>
            <Drawer
              anchor="right"
              className={classes.Drawer}
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <Box className={classes.Drawer}>
                <Link to="/" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
                  <Typography>Home</Typography>
                </Link>
                <Link
                  to="/destinations"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}
                >
                  <Typography>Top Destinations</Typography>
                </Link>
                <Link to="/events" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
                  <Typography>Upcoming Events</Typography>
                </Link>
                <Link
                  to="/countries"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}
                >
                  <Typography>Countries</Typography>
                </Link>
                <Link
                  to="/locations"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}
                >
                  <Typography>Top Locations</Typography>
                </Link>
                <Link
                  to="/continents"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}
                >
                  <Typography>Continents</Typography>
                </Link>
                <Link to="/" className={classes.linksDrawer}>
                  <Typography>Blog</Typography>
                </Link>
                <Link to="/" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
                  <Typography>About us</Typography>
                </Link>
              </Box>
            </Drawer>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon
                style={{
                  color: 'rgb(255, 255, 255)',
                  height: '2em',
                  width: '2em'
                }}
              />
            </IconButton>
          </>
        )}
      </Grid>
      {!isMobile && (
        <>
          <Link to="/" className={classes.links}>
            <Typography variant="p">Explore</Typography>
          </Link>
          <Link to="/destinations" className={classes.links}>
            <Typography variant="p">Top Destinations</Typography>
          </Link>
          <Link to="/locations" className={classes.links}>
            <Typography variant="p">Top Locations</Typography>
          </Link>
          <Link to="/countries" className={classes.links}>
            <Typography variant="p">Countries</Typography>
          </Link>
          <Link to="/events" className={classes.links}>
            <Typography variant="p">Upcoming events</Typography>
          </Link>
        </>
      )}
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button variant="contained" className={classes.logout} onClick={Logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign-In
          </Button>
        )}
      </Toolbar>
      <IconButton />
    </AppBar>
  );
};

export default Navbar;
