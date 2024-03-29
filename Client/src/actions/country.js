import * as api from '../api/index';
import {
  LIKE_COUNTRY,
  DISLIKE_COUNTRY,
  FETCH_COUNTRIES,
  FETCH_COUNTRY,
  FETCH_COUNTRY_BY_SEARCH,
  START_LOADING_COUNTRIES,
  END_LOADING_COUNTRIES,
  CREATE_COUNTRY,
  UPDATE_COUNTRY,
  DELETE_COUNTRY,
  BOOKMARK_COUNTRY,
  CANCEL_BOOKMARK_COUNTRY,
} from '../constants/actionTypes';

// Action Creators
export const getTopCountries = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COUNTRIES });
    const {
      data: { data },
    } = await api.fetchTopCountries();

    dispatch({ type: FETCH_COUNTRIES, payload: { data } });
    dispatch({ type: END_LOADING_COUNTRIES });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCountries = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COUNTRIES });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchCountries(page);
    dispatch({
      type: FETCH_COUNTRIES,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING_COUNTRIES });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCountry = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchCountry(id);
    dispatch({ type: START_LOADING_COUNTRIES });
    dispatch({ type: FETCH_COUNTRY, payload: data });
    dispatch({ type: END_LOADING_COUNTRIES });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCountriesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COUNTRIES });
    const {
      data: { data },
    } = await api.fetchCountriesBySearch(searchQuery);
    console.log('searchedCountries', data);
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
    dispatch({ type: START_LOADING_COUNTRIES });
    dispatch({ type: CREATE_COUNTRY, payload: [data] });
    dispatch({ type: END_LOADING_COUNTRIES });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCountry = (id, destination) => async (dispatch) => {
  try {
    const { data } = await api.updateCountry(id, destination);
    dispatch({ type: UPDATE_COUNTRY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCountry = (id) => async (dispatch) => {
  try {
    await api.deleteCountry(id);
    dispatch({ type: DELETE_COUNTRY, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const likeCountry = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likeCountry(id, userId);
    console.log('after upvote ', data);
    dispatch({ type: LIKE_COUNTRY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const bookmarkCountry = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.bookmarkCountry(id, userId);
    console.log('after post bookmark ', data);
    dispatch({ type: BOOKMARK_COUNTRY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const cancelBookmarkCountry = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.cancelBookmarCountry(id, userId);
    console.log('after post bookmark ', data);
    dispatch({ type: CANCEL_BOOKMARK_COUNTRY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
