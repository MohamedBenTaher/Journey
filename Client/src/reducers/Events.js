import {
  LIKE,
  UPDATE_EVENT,
  CREATE_EVENT,
  FETCH_EVENTS,
  DELETE_EVENT,
  FETCH_EVENT,
  FETCH_EVENT_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT_EVENT,
  FETCH_EVENTS_BY_CREATOR,
  ATTEND_EVENT,
  BOOKMARK_EVENT,
  CANCEL_BOOKMARK_EVENT,
} from '../constants/actionTypes.js';
const EventReducer = (state = { isLoading: true, events: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload.data,
        currentPage: action.payload.currentPage,
        NumberOfPages: action.payload.numrOfPages,
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
      return { ...state, events: state.events.filter((event) => event._id !== action.payload) };

    case ATTEND_EVENT:
      return {
        ...state,
        event: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event,
        ),
      };

    // case LIKE:
    //   return {...state,events:state.events.map((event) => {
    //     if(event._id === action.payload._id)
    //     {return action.payload}
    //    return event;
    // })};
    case FETCH_EVENT_BY_SEARCH:
      return { ...state, events: action.payload.data };
    case BOOKMARK_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id
            ? {
                ...event,
                bookmarkedBy: [...event.bookmarkedBy, action.payload.userId],
              }
            : event,
        ),
      };
    case CANCEL_BOOKMARK_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id
            ? {
                ...event,
                bookmarkedBy: event.bookmarkedBy.filter(
                  (userId) => userId !== action.payload.userId,
                ),
              }
            : event,
        ),
      };
    default:
      return state;
  }
};

export default EventReducer;
