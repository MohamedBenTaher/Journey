import {
  UPDATE_EVENT,
  CREATE_EVENT,
  FETCH_EVENTS,
  DELETE_EVENT,
  FETCH_EVENT,
  FETCH_EVENT_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_EVENTS_BY_CREATOR,
  ATTEND_EVENT,
  CANCEL_EVENT,
  BOOKMARK_EVENT,
  CANCEL_BOOKMARK_EVENT,
} from '../constants/actionTypes';

const eventReducer = (state = { isLoadingEvents: true, events: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoadingEvents: true };
    case END_LOADING:
      return { ...state, isLoadingEvents: false };
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numrOfPages,
      };
    case FETCH_EVENT:
      return { ...state, event: action.payload };

    case FETCH_EVENTS_BY_CREATOR:
      return { ...state, events: action.payload.data };
    case CREATE_EVENT:
      return { ...state, events: action.payload };

    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event,
        ),
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };

    case ATTEND_EVENT:
      return {
        ...state,
        event: state.events.map((event) =>
        event._id === action.payload._id ? action.payload : event,
        ),
      };
      case CANCEL_EVENT:
      return {
        ...state,
        event: state.events.map((event) =>
        event._id !== action.payload._id ? action.payload : event,
        ),
      };
    case FETCH_EVENT_BY_SEARCH:
      return { ...state, events: action.payload.data };
    case BOOKMARK_EVENT:
      return {
        ...state,
        events: state.events.map((event) => (event._id === action.payload.id
            ? {
              ...event,
              bookmarkedBy: [...event.bookmarkedBy, action.payload.userId],
              }
            : event
            )),
      };
    case CANCEL_BOOKMARK_EVENT:
      return {
        ...state,
        events: state.events.map((event) => (event._id === action.payload.id
            ? {
                ...event,
              bookmarkedBy: event.bookmarkedBy.filter(
                (userId) => userId !== action.payload.userId,
                ),
              }
            : event
            )),
      };
      
    default:
      return state;
  }
};

export default eventReducer;
