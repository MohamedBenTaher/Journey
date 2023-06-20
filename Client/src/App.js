import React, { useEffect, useState } from 'react'
import { Container, Box, CssBaseline } from '@material-ui/core'
import useStyles from "./styles.js"
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts';
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero.js';
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Components/Auth/Auth.js';
import PostDetails from './Components/PostDetails/PostDetails.js';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import SearchBar from './Components/Home/SearchBar.js';
import CreatorOrTag from './Components/CreatorOrTag/CreatorOrTag'
import EventForm from './Components/Event/Form/EventForm'
import EventCard from './Components/Event/Display/EventCard.jsx';
import Events from './Components/Event/Events.js';
import Destinations from './Components/Destination/Destinations/Destinations.js';
import DestinationForm from './Components/Destination/DestinationForm/DestinationForm.js';
import DestinationDetails from './Components/Destination/DestinationDetails/DestinationDetails.jsx';
import { useParams } from 'react-router-dom';
import ContinentLayout from './Components/Continent/ContinentLayout/ContinentLayout.jsx';
import ContinentDetails from './Components/Continent/ContinentDetails/ContinentDetails.jsx';
import ContinentForm from './Components/Continent/ContinentFrom/ContinentForm.jsx';
import CountryLayout from './Components/Country/CountryLayout/CountryLayout.jsx';
import CountryDetail from './Components/Country/CountryDetails/CountryDetails.jsx';
import CountryForm from './Components/Country/CountryForm/CountryForm.jsx';
import PostForm from './Components/Posts/PostForm.js/PostForm.jsx';
import LocationLayout from './Components/Location/LocationLayout/LocationLayout.jsx';
import LocationFom from './Components/Location/LocationForm/LocationForm.jsx';
import LocationDetails from './Components/Location/LocationDetails/LocationDetails.jsx';
import EventDetails from './Components/Event/EventDetails/EventDetails.jsx';
import Profile from './Components/User/Profile/Profile.jsx';
import NavbarSecondary from './Components/Navbar/NavbarSecondary.js';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (

      <CssBaseline >
              <Switch>
                <Route path='/' exact component={() => <Redirect to="/stories" />} />
                <Route path='/stories' exact component={Home} />
              </Switch>
             
              <Switch>
          <Route path="/events/new/:id?" exact>
            <NavbarSecondary />
            <EventForm />
          </Route>
          <Route path="/events" exact>
            <NavbarSecondary />
            <Events />
          </Route>
          <Route path="/events/:id" exact>
            <NavbarSecondary />
            <EventDetails />
          </Route>
          <Route path="/stories/search" exact>
            <NavbarSecondary />
            <Home />
          </Route>
          <Route path="/stories/new/:id?" exact>
            <NavbarSecondary />
            <PostForm />
          </Route>
          <Route path="/stories/:id" exact>
            <NavbarSecondary />
            <PostDetails />
          </Route>
          <Route path={["/creators/:name", "/tags/:name"]}>
            <NavbarSecondary />
            <CreatorOrTag />
          </Route>
          <Route path="/destinations" exact>
            <NavbarSecondary />
            <Destinations />
          </Route>
          <Route path="/destinations/new/:id?" exact>
            <NavbarSecondary />
            <DestinationForm />
          </Route>
          <Route path="/destinations/:id/" exact>
            <NavbarSecondary />
            <DestinationDetails />
          </Route>
          <Route path="/locations" exact>
            <NavbarSecondary />
            <LocationLayout />
          </Route>
          <Route path="/locations/new/:id?" exact>
            <NavbarSecondary />
            <LocationFom />
          </Route>
          <Route path="/locations/:id/" exact>
            <NavbarSecondary />
            <LocationDetails />
          </Route>
          <Route path="/continents" exact>
            <NavbarSecondary />
            <ContinentLayout />
          </Route>
          <Route path="/continents/new/:id?" exact>
            <NavbarSecondary />
            <ContinentForm />
          </Route>
          <Route path="/continents/:id" exact>
            <NavbarSecondary />
            <ContinentDetails />
          </Route>
          <Route path="/countries" exact>
            <NavbarSecondary />
            <CountryLayout />
          </Route>
          <Route path="/countries/new/:id?" exact>
            <NavbarSecondary />
            <CountryForm />
          </Route>
          <Route path="/countries/:id" exact>
            <NavbarSecondary />
            <CountryDetail />
          </Route>
          <Route path="/auth" exact>
            {!user ? <Auth /> : <Redirect to="/stories" />}
          </Route>
          <Route path="/user-profile" exact>
            <NavbarSecondary />
            <Profile id={user?.result?._id} />
          </Route>
        </Switch>

          <Footer />

      </CssBaseline>
  );
}

export default App;