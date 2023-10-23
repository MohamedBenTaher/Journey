import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Button,
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
import logoDark from '../../assets/images/logoDark.png';
import logo from '../../assets/images/logo.png';
import useStyles from './secondaryStyles.js';
import { signOut } from '../../actions/auth';

function NavbarSecondary() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const Logout = () => {
    dispatch(signOut());
    history.push('/');
  };
  return (
    <AppBar className={classes.appBar} position="static" elevation={0}>
      <Grid className={classes.brandContainer}>
        <Link to="/" style={{ width: 'auto', height: 'auto' }}>
          <img className={classes.image} src={logoDark} alt="Journey" height={36} />
        </Link>
        {isMobile && (
          <>
            <Drawer
              anchor="right"
              className={classes.Drawer}
              open={isOpen}
              onClose={() => setIsOpen(false)}>
             
              <Box className={classes.Drawer}>
               <Link to="/" style={{ width: 'auto', height: 'auto' }}>
                <img className={classes.image} src={logoDark} alt="Journey" height={36} />
              </Link>
                <Link to="/" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link
                  to="/destinations"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}>
                  Top Destinations
                </Link>
                <Link to="/events" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
                  Upcoming Events
                </Link>
                <Link
                  to="/countries"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}>
                  Countries
                </Link>
                <Link
                  to="/locations"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}>
                  Top Locations
                </Link>
                <Link
                  to="/continents"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}>
                  Continents
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
        <Grid
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
          }}
          container
          spacing={4}
          direction="row">
          <Grid item>
            <Link to="/" className={classes.linksDrawer}>
              <Typography variant="p">Explore</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/destinations" className={classes.linksDrawer}>
              <Typography variant="p">Top Destinations</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/locations" className={classes.linksDrawer}>
              <Typography variant="p">Top Locations</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/countries" className={classes.linksDrawer}>
              <Typography variant="p">Countries</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/events" className={classes.linksDrawer}>
              <Typography variant="p">Upcoming events</Typography>
            </Link>
          </Grid>
        </Grid>
      )}
      <Grid className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Link to="/user-profile" className={classes.profileAvatar}>
              <Avatar className={classes.purple} alt={user?.user?.name} src={user?.user?.imageUrl}>
                {user?.user?.name?.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result?.name}
              </Typography>
            </Link>
            <Button
              variant="contained"
              color="primary"
              className={classes.logout}
              onClick={() => Logout()}>
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/auth/">
            <Button variant="contained" color="primary">
              Sign-In
            </Button>
          </Link>
        )}
      </Grid>
      <IconButton />
    </AppBar>
  );
}

export default NavbarSecondary;
