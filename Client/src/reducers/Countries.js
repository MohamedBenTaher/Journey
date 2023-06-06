
import { CREATE_COUNTRY,UPDATE_COUNTRY,DELETE_COUNTRY,LIKE_COUNTRY,DISLIKE_COUNTRY,FETCH_COUNTRY_BY_SEARCH,FETCH_COUNTRY,FETCH_COUNTRIES,START_LOADING_COUNTRIES,END_LOADING_COUNTRIES } from '../constants/actionTypes.js';
export default (state = { isLoading: false, countries: [] }, action) => {
  switch (action.type) {
    case START_LOADING_COUNTRIES:
      return { ...state, isLoading: true };
    case END_LOADING_COUNTRIES:
      return { ...state, isLoading: false }
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload.data,
        currentPage: action.payload.currentPage,
        NumberOfPages: action.payload.numrOfPages,
      };
    case FETCH_COUNTRY:
      return { ...state, country: action.payload };

    case FETCH_COUNTRY_BY_SEARCH:
      return { ...state, countries: action.payload.data };
    case CREATE_COUNTRY:
      return { ...state, countries: action.payload };

    case UPDATE_COUNTRY:
      return { ...state, countries: state.countries.map((country) => (country._id === action.payload._id ? action.payload : country)) };

    case DELETE_COUNTRY:
      return { ...state, countries: state.countries.filter((country) => country._id !== action.payload) };
      case LIKE_COUNTRY:
        console.log('upvote payload',action.payload)
        return {
          ...state,
          countries: state.countries.map((country) =>
          countries._id === action.payload._id
              ? {
                  ...countries,
                  likes: [...action.payload.likes],
                }
              : country
          ),
        };
      case DISLIKE_COUNTRY:
        return {
          ...state,
          destinations: state.destinations.map((destination) =>
            destination._id === action.payload._id
              ? {
                  ...destination,
                  upvotes: [...action.payload.upvotes],
                  downvotes: [...action.payload.downvotes],
                }
              : destination
          ),
        };
    default:
      return state;

  }
}
