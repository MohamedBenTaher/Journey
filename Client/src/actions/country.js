import * as api from '../api/index.js';
import { LIKE_COUNTRY,DISLIKE_COUNTRY,FETCH_COUNTRIES,FETCH_COUNTRY,FETCH_COUNTRY_BY_SEARCH, START_LOADING_COUNTRIES,END_LOADING_COUNTRIES, CREATE_COUNTRY, UPDATE_COUNTRY, DELETE_COUNTRY} from '../constants/actionTypes.js';

//Action Creators
export const getTopCountries = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_COUNTRIES })
      const { data: { data } } = await api.fetchTopCountries();
  
      dispatch({ type: FETCH_COUNTRIES, payload: { data } });
      dispatch({ type: END_LOADING_COUNTRIES });
    } catch (error) {
      console.log(error.message);
    }
  };
export const getCountries = (page) => async (dispatch) => {
  try {
    console.log('called action')
    dispatch({ type: START_LOADING_COUNTRIES })
    const { data: { data, currentPage, numberOfPages } } = await api.fetchCountries(page);
    console.log('actions',data)
    dispatch({ type: FETCH_COUNTRIES, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_COUNTRIES });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCountry = (id) => async (dispatch) => {
  try {
    
    const { data } = await api.fetchCountry(id);
    dispatch({ type: START_LOADING_COUNTRIES })
    dispatch({ type: FETCH_COUNTRY, payload: data });
    dispatch({ type: END_LOADING_COUNTRIES });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCountriesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COUNTRIES })
    const { data: { data } } = await api.fetchCountriesBySearch(searchQuery);
    console.log('searchedCountries', data)
    dispatch({ type: FETCH_COUNTRY_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_COUNTRIES });
  } catch (error) {
    console.log(error.message);
  }
};

export const createCountry = (destination) => async (dispatch) => {
  try {
    console.log(destination);
    const { data } = await api.createCountry(destination);
    dispatch({ type: START_LOADING_COUNTRIES })
    dispatch({ type: CREATE_COUNTRY, payload: [data] })
    dispatch({ type: END_LOADING_COUNTRIES});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateCountry = (id, destination) => async (dispatch) => {
  try {
    const { data } = await api.updateCountry(id, destination);
    dispatch({ type: UPDATE_COUNTRY, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}

export const deleteCountry = (id) => async (dispatch) => {
  try {
    await api.deleteCountry(id);
    dispatch({ type: DELETE_COUNTRY, payload: id });

  } catch (error) {
    console.log(error.message)
  }
}
export const likeCountry = (destinationId,userId) => async (dispatch) => {
  try {
    const { data } = await api.likeCountry(destinationId,userId);
    console.log('after upvote ',data)
    dispatch({ type: LIKE_COUNTRY, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}
export const dislikeCountry = (destinationId,userId) => async (dispatch) => {
  try {
    const { data } = await api.dislikeCountry(destinationId,userId);
    console.log('after downvote ',data)
    dispatch({ type: DISLIKE_COUNTRY, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}

