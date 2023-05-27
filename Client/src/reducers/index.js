import { combineReducers } from "redux";
import posts from './Posts.js'
import auth from './Auth.js'
import events from "./Events.js";
import destinations from "./Destinations.js";
import comments from "./Comments.js";
import countries from "./Countries.js";
import continents from "./Continents.js";
export default combineReducers({posts,auth,events,destinations,comments,continents,countries});