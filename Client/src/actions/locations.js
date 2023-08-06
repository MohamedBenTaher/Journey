import * as api from '../api/index';
import {
  RATE_LOCATION,
  UPDATE_LOCATION,
  CREATE_LOCATION,
  FETCH_LOCATION_BY_SEARCH,
  FETCH_LOCATION_BY_COUNTRY,
  FETCH_LOCATION_BY_DESTINATION,
  DELETE_LOCATION,
  FETCH_LOCATIONS,
  START_LOADING_LOCATIONS,
  END_LOADING_LOCATIONS,
  FETCH_LOCATION,
  CANCEL_BOOKMARK_LOCATION,
  BOOKMARK_LOCATION,
} from '../constants/actionTypes';

export const getTopLocations = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_LOCATIONS });
    const {
      data: { data },
    } = await api.fetchTopLocations();

    dispatch({ type: FETCH_LOCATIONS, payload: { data } });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getLocations = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_LOCATIONS });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchLocations(page);
    dispatch({
      type: FETCH_LOCATIONS,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getLocation = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchLocation(id);
    dispatch({ type: START_LOADING_LOCATIONS });
    dispatch({ type: FETCH_LOCATION, payload: data });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLocationsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_LOCATIONS });
    const {
      data: { data },
    } = await api.fetchLocationsBySearch(searchQuery);
    dispatch({ type: FETCH_LOCATION_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getLocationsByCountry = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_LOCATIONS });
    const {
      data: { data },
    } = await api.fetchLocationsByCountry(id);
    dispatch({ type: FETCH_LOCATION_BY_COUNTRY, payload: { data } });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLocationsByDestination = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_LOCATIONS });
    const {
      data: { data },
    } = await api.fetchLocationsByDestination(id);
    dispatch({ type: FETCH_LOCATION_BY_DESTINATION, payload: { data } });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const createLocation = (destination) => async (dispatch) => {
  try {
    const { data } = await api.createLocation(destination);
    dispatch({ type: START_LOADING_LOCATIONS });
    dispatch({ type: CREATE_LOCATION, payload: [data] });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLocation = (id, location) => async (dispatch) => {
  try {
    const { data } = await api.updateLocations(id, location);
    dispatch({ type: UPDATE_LOCATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLocation = (id) => async (dispatch) => {
  try {
    await api.deleteLocation(id);
    dispatch({ type: DELETE_LOCATION, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const rateLocation = (locationId, userId, avgRating) => async (dispatch) => {
  try {
    const { data } = await api.rateLocation(locationId, userId, avgRating);
    dispatch({ type: RATE_LOCATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const bookmarkLocation = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.bookmarkLocation(id, userId);
    dispatch({ type: BOOKMARK_LOCATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const cancelBookmarkLocation = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.cancelBookmarkLocation(id, userId);
    dispatch({ type: CANCEL_BOOKMARK_LOCATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
