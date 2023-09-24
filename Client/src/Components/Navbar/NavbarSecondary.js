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
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import title from '../../Images/title.png';
import memories from '../../Images/journey.png';
import useStyles from './secondaryStyles.js';
import { signOut } from '../../actions/auth';

function NavbarSecondary() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user=useSelector((state)=>state.auth.user)
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  // useEffect(() => {
  //   const token = user?.token;
  //   if (token) {
  //     const decoded = decode(token);
  //     if (decode.exp * 1000 < new Date().getTime()) dispatch({ type: 'LOGOUT' });
  //   }
  //   setUser(JSON.parse(localStorage.getItem('profile')));
  // }, [location]);
  // const Logout = () => {
  //   dispatch({ type: 'LOGOUT' });
  //   history.push('/');
  //   setUser(null);
  // };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const Logout = () => {
   dispatch(signOut(history));
  };
  return (
    <AppBar className={classes.appBar} position="static" elevation={0}>
      <Grid className={classes.brandContainer}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h2" className={classes.title}>
            Journey
          </Typography>
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
              </Box>
            </Drawer>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon
                style={{
                  color: 'rgb(0, 0, 0)',
                  height: '2em',
                  width: '2em',
                }}
              />
            </IconButton>
          </>
        )}
      </Grid>
      {!isMobile && (
        <>
          <Link to="/" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
            <Typography>Home</Typography>
          </Link>
          <Link to="/destinations" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
            <Typography>Top Destinations</Typography>
          </Link>
          <Link to="/events" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
            <Typography>Upcoming Events</Typography>
          </Link>
          <Link to="/countries" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
            <Typography>Countries</Typography>
          </Link>
          <Link to="/locations" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
            <Typography>Top Locations</Typography>
          </Link>
          <Link to="/continents" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
            <Typography>Continents</Typography>
          </Link>
        </>
      )}
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Link to="/user-profile" className={classes.profileAvatar}>
              <Avatar
                className={classes.purple}
                alt={user?.user?.name}
                src={user?.user?.imageUrl}
              >
                {user?.user?.name?.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.user?.name}
              </Typography>
            </Link>
            <Button variant="contained" className={classes.logout} onClick={()=>Logout()}>
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
}

export default NavbarSecondary;
