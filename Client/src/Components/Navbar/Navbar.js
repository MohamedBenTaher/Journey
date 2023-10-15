import React, { useState } from 'react';
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
import logo from '../../assets/images/logo.png';
import useStyles from './styles';
import { signOut } from '../../actions/auth';
import { Skeleton } from '@mui/material';

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const Logout = () => {
    dispatch(signOut());
    history.push("/")
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AppBar
      className={classes.appBar}
      position="static"
      style={{ background: 'transparent', boxShadow: 'none' }}>
      <Grid className={classes.brandContainer}>
        <Link to="/" style={{ width: 'auto', height: 'auto' }}>
          <img className={classes.image} src={logo} alt="Journey" height={36} />
        </Link>
        {isMobile && (
          <>
            <Drawer
              anchor="right"
              className={classes.Drawer}
              open={isOpen}
              onClose={() => setIsOpen(false)}>
              <Box className={classes.Drawer}>
                <Link to="/" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
                  <Typography>Home</Typography>
                </Link>
                <Link
                  to="/destinations"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}>
                  <Typography className={classes.navbarText}>Top Destinations</Typography>
                </Link>
                <Link to="/events" className={classes.linksDrawer} onClick={() => setIsOpen(false)}>
                  <Typography>Upcoming Events</Typography>
                </Link>
                <Link
                  to="/countries"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}>
                  <Typography>Countries</Typography>
                </Link>
                <Link
                  to="/locations"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}>
                  <Typography>Top Locations</Typography>
                </Link>
                <Link
                  to="/continents"
                  className={classes.linksDrawer}
                  onClick={() => setIsOpen(false)}>
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
          }}
          container
          spacing={4}
          direction="row">
          <Grid item>
            <Link to="/" className={classes.links}>
              <Typography variant="p">Explore</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/destinations" className={classes.links}>
              <Typography variant="p">Top Destinations</Typography>
            </Link>
          </Grid>
          <Grid item>
            {' '}
            <Link to="/locations" className={classes.links}>
              <Typography variant="p">Top Locations</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/countries" className={classes.links}>
              <Typography variant="p">Countries</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/events" className={classes.links}>
              <Typography variant="p">Upcoming events</Typography>
            </Link>
          </Grid>
        </Grid>
      )}
      <Toolbar className={classes.toolbar}>
        {!user && isLoading ? (
          <div className={classes.profile}>
            <Skeleton variant="text" width={'30%'} />
            <Skeleton variant="circular" width={48} height={48} />
          </div>
        ) : user && !isLoading ? (
          <div className={classes.profile}>
            <Link to="/user-profile" className={classes.profileAvatar}>
              <Avatar className={classes.purple} alt={user?.user?.name} src={user?.user?.imageUrl}>
                {user?.user?.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.user?.name}
              </Typography>
            </Link>
            <Button variant="contained" className={classes.logout} onClick={() => Logout()}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary" style={{whiteSpace: 'nowrap'}}>
            Sign-In
          </Button>
        )}
      </Toolbar>
      <IconButton />
    </AppBar>
  );
}

export default Navbar;
