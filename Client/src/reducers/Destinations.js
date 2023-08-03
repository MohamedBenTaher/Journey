import {
  UPDATE_DESTINATION,
  CREATE_DESTINATION,
  FETCH_DESTINATIONS,
  FETCH_DESTINATIONS_BY_COUNTRY,
  DELETE_DESTINATION,
  FETCH_DESTINATION,
  FETCH_DESTINATION_BY_SEARCH,
  START_LOADING_DESTINATIONS,
  END_LOADING_DESTINATIONS,
  COMMENT_DESTINATION,
  UPVOTE_DESTINATION,
  DOWNVOTE_DESTINATION,
  BOOKMARK_DESTINATION,
  CANCEL_BOOKMARK_DESTINATION,
  LIKE_DESTINATION,
} from '../constants/actionTypes.js';

export default (
  state = { isLoading: false, destinations: [], user: { savedDestinations: [] } },
  action,
) => {
  switch (action.type) {
    case START_LOADING_DESTINATIONS:
      return { ...state, isLoading: true };
    case END_LOADING_DESTINATIONS:
      return { ...state, isLoading: false };
    case FETCH_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload.data,
        currentPage: action.payload.currentPage,
        NumberOfPages: action.payload.numrOfPages,
      };
    case FETCH_DESTINATIONS_BY_COUNTRY:
      return {
        ...state,
        destinations: action.payload.data,
      };
    case FETCH_DESTINATION:
      return { ...state, destination: action.payload };
    case FETCH_DESTINATION_BY_SEARCH:
      return { ...state, destinations: action.payload.data };
    case CREATE_DESTINATION:
      return { ...state, destinations: action.payload };
    case UPDATE_DESTINATION:
      return {
        ...state,
        destinations: state.destinations.map((destination) =>
          destination._id === action.payload._id ? action.payload : destination,
        ),
      };
    case DELETE_DESTINATION:
      return {
        ...state,
        destinations: state.destinations.filter(
          (destination) => destination._id !== action.payload,
        ),
      };
    case UPVOTE_DESTINATION:
    case DOWNVOTE_DESTINATION:
      return {
        ...state,
        destinations: state.destinations.map((destination) =>
          destination._id === action.payload._id ? action.payload : destination,
        ),
      };
    case LIKE_DESTINATION:
      return {
        ...state,
        destinations: state.destinations.map((destination) =>
          destination._id === action.payload._id ? action.payload : destination,
        ),
      };
    case BOOKMARK_DESTINATION:
      return {
        ...state,
        destinations: state.destinations.map((destination) =>
          destination._id === action.payload.id
            ? {
                ...destination,
                bookmarkedBy: [...destination.bookmarkedBy, action.payload.userId],
              }
            : destination,
        ),
      };
    case CANCEL_BOOKMARK_DESTINATION:
      return {
        ...state,
        destinations: state.destinations.map((destination) =>
          destination._id === action.payload.id
            ? {
                ...destination,
                bookmarkedBy: destination.bookmarkedBy.filter(
                  (userId) => userId !== action.payload.userId,
                ),
              }
            : destination,
        ),
      };
    default:
      return state;
  }
};
