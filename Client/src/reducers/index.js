import { applyMiddleware, combineReducers } from 'redux';
import posts from './Posts';
import auth from './Auth';
import events from './Events';
import destinations from './Destinations';
import comments from './Comments';
import countries from './Countries';
import continents from './Continents';
import locations from './Locations';
import authMiddleware from '../middleware/authMiddleware';

export default combineReducers({
  posts,
  auth,
  events,
  destinations,
  comments,
  continents,
  countries,
  locations,
},
// applyMiddleware(authMiddleware)
);
