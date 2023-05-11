
import { LIKE, UPDATE_DESTINATION, CREATE_DESTINATION, FETCH_DESTINATIONS, DELETE_DESTINATION, FETCH_DESTINATION, FETCH_DESTINATION_BY_SEARCH, START_LOADING_DESTINATIONS, END_LOADING_DESTINATIONS, COMMENT_DESTINATION, UPVOTE_DESTINATION,DOWNVOTE_DESTINATION } from '../constants/actionTypes.js';
const DestinationReducer = (state = { isLoading: true, destinations: [] }, action) => {
  switch (action.type) {
    case START_LOADING_DESTINATIONS:
      return { ...state, isLoading: true };
    case END_LOADING_DESTINATIONS:
      return { ...state, isLoading: false }
    case FETCH_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload.data,
        currentPage: action.payload.currentPage,
        NumberOfPages: action.payload.numrOfPages,
      };
    case FETCH_DESTINATION:
      return { ...state, destination: action.payload };

    case FETCH_DESTINATION_BY_SEARCH:
      return { ...state, destinations: action.payload.data };
    case CREATE_DESTINATION:
      return { ...state, destinations: action.payload };

    case UPDATE_EVENT:
      return { ...state, destinations: state.events.map((event) => (event._id === action.payload._id ? action.payload : event)) };

    case DELETE_EVENT:
      return { ...state, destinations: state.events.filter((event) => event._id !== action.payload) };


    case ATTEND_EVENT:
      return { ...state, destination: state.destinations.map((event) => (event._id === action.payload._id ? action.payload : event)) };
// still needs work
    case UPVOTE_DESTINATION:
      return {...state,destinations:state.destinations.map((event) => {
        if(event._id === action.payload._id) 
        {return action.payload}
       return event;
    })};
    case DOWNVOTE_DESTINATION:
      return {...state,destinations:state.destinations.map((destination) => {
        if(destination._id === action.payload._id) 
        {return action.payload}
       return destination;
    })};


    default:
      return state;

  }
}

export default DestinationReducer;