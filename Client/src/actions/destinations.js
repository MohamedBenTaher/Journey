import * as api from '../api/index';
import {
  LIKE,
  UPDATE_DESTINATION,
  CREATE_DESTINATION,
  FETCH_DESTINATION_BY_SEARCH,
  FETCH_DESTINATIONS_BY_COUNTRY,
  DELETE_DESTINATION,
  FETCH_DESTINATIONS,
  START_LOADING_DESTINATIONS,
  END_LOADING_DESTINATIONS,
  FETCH_DESTINATION,
  LIKE_DESTINATION,
  UPVOTE_DESTINATION,
  DOWNVOTE_DESTINATION,
  BOOKMARK_DESTINATION,
  CANCEL_BOOKMARK_DESTINATION,
} from '../constants/actionTypes';

export const getTopDestinations = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATIONS });
    const {
      data: { data },
    } = await api.fetchTopDestinations();

    dispatch({ type: FETCH_DESTINATIONS, payload: { data } });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getDestinations = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATIONS });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchDestinatons(page);
    dispatch({
      type: FETCH_DESTINATIONS,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getDestination = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchDestination(id);
    dispatch({ type: START_LOADING_DESTINATIONS });
    dispatch({ type: FETCH_DESTINATION, payload: data });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDestinationssBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATIONS });
    const {
      data: { data },
    } = await api.fetchDestinationsBySearch(searchQuery);
    console.log('searchedDseyinations', data);
    dispatch({ type: FETCH_DESTINATION_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getDestinationByCountry = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATIONS });
    const response = await api.fetchDestinationByCountry(id);
    const data = response.data;
    dispatch({ type: FETCH_DESTINATIONS_BY_COUNTRY, payload: { data } });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const createDestination = (destination) => async (dispatch) => {
  try {
    console.log(destination);
    const { data } = await api.createDestionation(destination);
    dispatch({ type: START_LOADING_DESTINATIONS });
    dispatch({ type: CREATE_DESTINATION, payload: [data] });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDestination = (id, destination) => async (dispatch) => {
  try {
    const { data } = await api.updateDestinations(id, destination);
    dispatch({ type: UPDATE_DESTINATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDestination = (id) => async (dispatch) => {
  try {
    await api.deleteDestination(id);
    dispatch({ type: DELETE_DESTINATION, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const upvoteDestination = (destinationId, userId) => async (dispatch) => {
  try {
    const { data } = await api.upVoteDestination(destinationId, userId);
    dispatch({ type: UPVOTE_DESTINATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const downvoteDestination = (destinationId, userId) => async (dispatch) => {
  try {
    const { data } = await api.downVoteDestination(destinationId, userId);
    dispatch({ type: DOWNVOTE_DESTINATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const likeDestination = (destinationId, userId) => async (dispatch) => {
  try {
    const { data } = await api.likeDestination(destinationId, userId);
    dispatch({ type: LIKE_DESTINATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const bookmarkDestination = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.bookmarkDestination(id, userId);
    dispatch({ type: BOOKMARK_DESTINATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const cancelBookmarkDestination = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.cancelBookmarkDestination(id, userId);
    dispatch({ type: CANCEL_BOOKMARK_DESTINATION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
