
import { CREATE_CONTINENT,UPDATE_COUNTINENT,DELETE_COUNTINENT,FETCH_CONTINENT_BY_SEARCH,FETCH_CONTINENT,FETCH_CONTINENTS,START_LOADING_CONTINENTS,END_LOADING_CONTINENTS } from '../constants/actionTypes.js';
export default (state = { isLoading: false, continents: [] }, action) => {
  switch (action.type) {
    case START_LOADING_CONTINENTS:
      return { ...state, isLoading: true };
    case END_LOADING_CONTINENTS:
      return { ...state, isLoading: false }
    case FETCH_CONTINENTS:
      return {
        ...state,
        countries: action.payload.data,
        currentPage: action.payload.currentPage,
        NumberOfPages: action.payload.numrOfPages,
      };
    case FETCH_CONTINENT:
      return { ...state, continents: action.payload };

    case FETCH_CONTINENT_BY_SEARCH:
      return { ...state, continents: action.payload.data };
    case CREATE_CONTINENT:
      return { ...state, continents: action.payload };

    case UPDATE_COUNTINENT:
      return { ...state, continents: state.continents.map((continent) => (continent._id === action.payload._id ? action.payload : continent)) };

    case DELETE_COUNTINENT:
      return { ...state, continents: state.continents.filter((continent) => continent._id !== action.payload) };
    default:
      return state;

  }
}