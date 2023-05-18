import { combineReducers } from "redux";
import posts from './Posts.js'
import auth from './Auth.js'
import events from "./Events.js";
import destinations from "./Destinations.js";
export default combineReducers({posts,auth,events,destinations});