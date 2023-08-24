import { CssBaseline } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
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
// import PostForm from './Components/Posts/PostForm/PostForm';
import LocationLayout from './Components/Location/LocationLayout/LocationLayout';
import LocationFom from './Components/Location/LocationForm/LocationForm';
import LocationDetails from './Components/Location/LocationDetails/LocationDetails';
import EventDetails from './Components/Event/EventDetails/EventDetails';
import Profile from './Components/User/Profile/Profile';
import NavbarSecondary from './Components/Navbar/NavbarSecondary';
import PrivateRoute from './Components/Auth/PrivateRoute';
import { signOut, signin ,getUser} from './actions/auth';
import { checkTokenValidity } from './utlis/auth';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const  App = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn=useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history=useHistory()
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      checkTokenValidity(token)
        .then((userData) => {
          dispatch(getUser(userData.id));
        })
        .catch(() => {
          dispatch(signOut(history));
        });
    }
  }, [dispatch, token]);



  return (
    <CssBaseline>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/stories" />} />
        <Route path="/stories" exact component={Home} />
      </Switch>

      <Switch>
        <PrivateRoute path="/events/new/:id?" exact user={user}>
          <NavbarSecondary />
          <EventForm />
        </PrivateRoute>
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
        <PrivateRoute path="/destinations/new/:id?" exact user={user}>
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
        <PrivateRoute path="/locations/new/:id?" exact user={user}>
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
        <PrivateRoute path="/continents/new/:id?" exact user={user}>
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
        <Route element={<PrivateRoute />}>
          <PrivateRoute path="/user-profile" exact isAuthenticated={isLoggedIn}>
            <NavbarSecondary />
            <Profile id={user?.result?._id} />
          </PrivateRoute>
        </Route>
      </Switch>

      <Footer />
    </CssBaseline>
  );
}

export default App;
