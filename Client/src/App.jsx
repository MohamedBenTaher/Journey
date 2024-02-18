import React from 'react';
import { CssBaseline, Typography } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import PostDetails from './Components/Posts/PostDetails/PostDetails';
import CreatorOrTag from './Components/CreatorOrTag/CreatorOrTag';
import EventForm from './Components/Event/Form/EventForm';
import Events from './Components/Event/Events';
import Destinations from './Components/Destination/Destinations/Destinations';
import DestinationForm from './Components/Destination/DestinationForm/DestinationForm';
import DestinationDetails from './Components/Destination/DestinationDetails/DestinationDetails';
import ContinentLayout from './Components/Continent/ContinentLayout/ContinentLayout';
import ContinentDetails from './Components/Continent/ContinentDetails/ContinentDetails';
import ContinentForm from './Components/Continent/ContinentFrom/ContinentForm';
import CountryLayout from './Components/Country/CountryLayout/CountryLayout';
import CountryDetail from './Components/Country/CountryDetails/CountryDetails';
import CountryForm from './Components/Country/CountryForm/CountryForm';
import LocationLayout from './Components/Location/LocationLayout/LocationLayout';
import LocationFom from './Components/Location/LocationForm/LocationForm';
import LocationDetails from './Components/Location/LocationDetails/LocationDetails';
import EventDetails from './Components/Event/EventDetails/EventDetails';
import Profile from './Components/User/Profile/Profile';
import NavbarSecondary from './Components/Navbar/NavbarSecondary';
import PrivateRoute from './Components/Auth/PrivateRoute';
import { authCheck } from './actions/auth';
import { useEffect } from 'react';
import OrganizerProfile from './Components/Organizer/Profile/Profile';
import Alert from '@mui/material/Alert';
import { hideAlert } from './actions/alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const App = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const { token } = useSelector((state) => state.auth);
  console.log('alert', alert);
  useEffect(() => {
    console.log('called useEffect');
    authCheck(token);
  }, [dispatch, token]);

  if (isLoggedIn == undefined) return;
  return (
    <CssBaseline>
      <div style={{ zIndex: 9999 }}>
        {alert?.message && (
          <Alert
            style={
              alert?.message
                ? {
                    position: 'fixed',
                    top: '0',
                    zIndex: 9999,
                    width: '100%',
                    height: '5%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }
                : { display: 'none' }
            }
            severity={alert?.alertType}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  dispatch(hideAlert());
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            <Typography variant="body1" align="center">
              {alert?.message}
            </Typography>
          </Alert>
        )}
      </div>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/stories" />} />
        <Route path="/stories" exact component={Home} />
        <PrivateRoute path="/events/new/:id?" exact user={user} isLoggedIn={isLoggedIn}>
          <NavbarSecondary />
          <EventForm />
        </PrivateRoute>
        <Route path="/events" exact>
          <NavbarSecondary />
          <Events />
        </Route>
        <Route path="/events/:id" isLoggedIn={user} exact>
          <NavbarSecondary />
          <EventDetails />
        </Route>
        <Route path="/stories/search" exact>
          <NavbarSecondary />
          <Home />
        </Route>
        <PrivateRoute path="/stories/new/:id?" exact user={user}>
          <NavbarSecondary />
          {/* <PostForm /> */}
        </PrivateRoute>
        <Route path="/stories/:id" exact>
          <NavbarSecondary />
          <PostDetails />
        </Route>
        <Route path={['/creators/:name', '/tags/:name']}>
          <NavbarSecondary />
          <CreatorOrTag />
        </Route>
        <Route path="/destinations" exact>
          <NavbarSecondary />
          <Destinations />
        </Route>
        <PrivateRoute path="/destinations/new/:id?" isLoggedIn={isLoggedIn} exact user={user}>
          <NavbarSecondary />
          <DestinationForm />
        </PrivateRoute>
        <Route path="/destinations/:id/" exact>
          <NavbarSecondary />
          <DestinationDetails />
        </Route>
        <Route path="/locations" exact>
          <NavbarSecondary />
          <LocationLayout />
        </Route>
        <PrivateRoute path="/locations/new/:id?" isLoggedIn={isLoggedIn} exact user={user}>
          <NavbarSecondary />
          <LocationFom />
        </PrivateRoute>
        <Route path="/locations/:id/" exact>
          <NavbarSecondary />
          <LocationDetails />
        </Route>
        <Route path="/continents" exact>
          <NavbarSecondary />
          <ContinentLayout />
        </Route>
        <PrivateRoute path="/continents/new/:id?" isLoggedIn={isLoggedIn} exact user={user}>
          <NavbarSecondary />
          <ContinentForm />
        </PrivateRoute>
        <Route path="/continents/:id" exact>
          <NavbarSecondary />
          <ContinentDetails />
        </Route>
        <Route path="/countries" exact>
          <NavbarSecondary />
          <CountryLayout />
        </Route>
        <PrivateRoute path="/countries/new/:id?" exact isLoggedIn={isLoggedIn}>
          <NavbarSecondary />
          <CountryForm />
        </PrivateRoute>
        <Route path="/countries/:id" exact>
          <NavbarSecondary />
          <CountryDetail />
        </Route>
        <Route path="/auth" exact>
          {!user ? <Auth /> : <Redirect to="/stories" />}
        </Route>
        <PrivateRoute path="/user" exact isLoggedIn={isLoggedIn}>
          <NavbarSecondary />
          <Profile id={user?.result?._id} />
        </PrivateRoute>
        <PrivateRoute path="/organizer" exact isLoggedIn={isLoggedIn}>
          <NavbarSecondary />
          <OrganizerProfile id={user?.result?._id} />
        </PrivateRoute>
      </Switch>

      <Footer />
    </CssBaseline>
  );
};

export default App;
