
import { UPDATE_DESTINATION, CREATE_DESTINATION, FETCH_DESTINATIONS, DELETE_DESTINATION, FETCH_DESTINATION, FETCH_DESTINATION_BY_SEARCH, START_LOADING_DESTINATIONS, END_LOADING_DESTINATIONS, COMMENT_DESTINATION, UPVOTE_DESTINATION,DOWNVOTE_DESTINATION } from '../constants/actionTypes.js';
export default (state = { isLoading: true, destinations: [] }, action) => {
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

    case UPDATE_DESTINATION:
      return { ...state, destinations: state.destinations.map((event) => (event._id === action.payload._id ? action.payload : event)) };

    case DELETE_DESTINATION:
      return { ...state, destinations: state.destinations.filter((event) => event._id !== action.payload) };
      case UPVOTE_DESTINATION:
        return {
          ...state,
          destinations: state.destinations.map((destination) =>
            destination.id === action.payload
              ? {
                  ...destination,
                  upvotes: [...destination.upvotes, action.userId],
                  downvotes: destination.downvotes.filter((id) => id !== action.userId),
                }
              : destination
          ),
        };
      case DOWNVOTE_DESTINATION:
        return {
          ...state,
          destinations: state.destinations.map((destination) =>
            destination.id === action.payload
              ? {
                  ...destination,
                  downvotes: [...destination.downvotes, action.userId],
                  upvotes: destination.upvotes.filter((id) => id !== action.userId),
                }
              : destination
          ),
        };
    default:
      return state;

  }
}
