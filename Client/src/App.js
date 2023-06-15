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

const theme = createTheme({
  typography: {
    fontFamily: [
      'Gilroy', 'sans-serif'
    ].join(','),
  },
});
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline >
        <BrowserRouter>

          

              <Switch>
                <Route path='/' exact component={() => <Redirect to="/stories" />} />
                <Route path='/stories' exact component={Home} />
                <Route path='/events/create' exact component={EventForm} />
                <Route path='/events' exact component={Events} />
                <Route path="/stories/search" exact component={Home} />
                <Route path='/stories/new/:id?' exact component={PostForm} />
                <Route path='/stories/:id' exact component={PostDetails} />
                <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
                <Route path={'/destinations'} exact component={Destinations} />
                <Route path={'/destinations/new/:id?'} exact component={DestinationForm} />
                <Route path={'/destinations/:id/'} exact component={DestinationDetails} />
                <Route path={'/locations'} exact component={LocationLayout} />
                <Route path={'/locations/new/:id?'} exact component={LocationFom} />
                <Route path={'/locations/:id/'} exact component={LocationDetails} />
                <Route path={'/continents'} exact component={ContinentLayout} />
                <Route path={'/continents/new/:id?'} exact component={ContinentForm} />
                <Route path={'/continents/:id'} exact component={ContinentDetails} />
                <Route path={'/countries'} exact component={CountryLayout}/>
                <Route path={'/countries/new/:id?'} exact component={CountryForm} />
                <Route path={'/countries/:id'} exact component={CountryDetail}/>
                <Route path='/auth' exact component={() => !user ? <Auth /> : <Redirect to="/stories" />} />
              </Switch>
          <Footer />
        </BrowserRouter>

      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;