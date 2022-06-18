import { combineReducers } from "redux";
import posts from './Posts.js'
import auth from './Auth.js'

export default combineReducers({posts,auth});