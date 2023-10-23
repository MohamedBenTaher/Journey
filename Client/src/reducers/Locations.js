import {
  UPDATE_LOCATION,
  CREATE_LOCATION,
  FETCH_LOCATION,
  FETCH_LOCATIONS,
  FETCH_POPULAR_LOCATIONS,
  DELETE_LOCATION,
  FETCH_LOCATION_BY_SEARCH,
  START_LOADING_LOCATIONS,
  END_LOADING_LOCATIONS,
  RATE_LOCATION,
  BOOKMARK_LOCATION,
  CANCEL_BOOKMARK_LOCATION,
  FETCH_LOCATION_BY_DESTINATION,
} from '../constants/actionTypes';

const locationReducer = (state = { isLoadingLocations:true, locations: [] }, action) => {
  switch (action.type) {
    case START_LOADING_LOCATIONS:
      return { ...state, isLoadingLocations: true };
    case END_LOADING_LOCATIONS:
      return { ...state, isLoadingLocations: false };
    case FETCH_LOCATIONS:
      return {
        ...state,
        locations: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numrOfPages,
      };
    case FETCH_LOCATION_BY_SEARCH :
      return {
        ...state,
        locations: action.payload.data,
      };
    case FETCH_POPULAR_LOCATIONS:
     return {
        ...state,
        locations: action.payload.data,
      };
    case FETCH_LOCATION:
      return { ...state, location: action.payload };

    case FETCH_LOCATION_BY_SEARCH:
      return { ...state, locations: action.payload.data };
    case CREATE_LOCATION:
      return { ...state, locations: action.payload };

    case UPDATE_LOCATION:
      return {
        ...state,
        locations: state.locations.map((location) => (location._id === action.payload._id ? action.payload : location)),
      };
    case FETCH_LOCATION_BY_DESTINATION:
      return { ...state, locations: action.payload };

    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter((locations) => locations._id !== action.payload),
      };
    case RATE_LOCATION:
      return {
        ...state,
        locations: locations.map((location) => {
          if (location._id === action.payload.locationId) {
            const ratingIndex = location.avgRating.findIndex(
              (rating) => rating.id === action.payload.userId,
            );
            if (ratingIndex !== -1) {
              location.avgRating[ratingIndex].rating = action.payload.rating;
            } else {
              location.avgRating.push({
                id: action.payload.userId,
                rating: action.payload.rating,
              });
            }
          }
          return location;
        }),
      };
    case BOOKMARK_LOCATION:
      return {
        ...state,
        locations: state.locations.map((location) => (location._id === action.payload.id
            ? {
                ...location,
                bookmarkedBy: [...location.bookmarkedBy, action.payload.userId],
              }
            : location
        )),
      };
    case CANCEL_BOOKMARK_LOCATION:
      return {
        ...state,
        locations: state.locations.map((location) => (location._id === action.payload.id
            ? {
              ...location,
                bookmarkedBy: location.bookmarkedBy.filter(
                  (userId) => userId !== action.payload.userId,
              ),
            }
            : location
        )),
      };
    default:
      return state;
  }
};
export default locationReducer