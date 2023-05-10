import * as api from '../api/index.js';
import { LIKE, UPDATE_DESTINATION, CREATE_DESTINATION, FETCH_DESTINATION_BY_SEARCH, DELETE_DESTINATION, FETCH_DESTINATIONS, START_LOADING_DESTINATIONS, END_LOADING_DESTINATIONS, FETCH_DESTINATION, COMMENT_DESTINATION, UPVOTE_DESTINATION } from '../constants/actionTypes.js';

//Action Creators

export const getDestinations = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATIONS })
    const { data: { data, currentPage, numberOfPages } } = await api.fetchEvents(page);

    dispatch({ type: FETCH_DESTINATIONS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getDestination = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATIONS })
    const { data } = await api.fetchEvent(id);

    dispatch({ type: FETCH_DESTINATION, payload: data });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getDestinationssBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATIONS })
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    console.log('searchedDseyinations', data)
    dispatch({ type: FETCH_DESTINATION_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const createDestination = (event) => async (dispatch) => {
  try {
    console.log(event);
    const { data } = await api.createEvent(event);
    dispatch({ type: START_LOADING_DESTINATIONS })
    dispatch({ type: CREATE_DESTINATION, payload: [data] })
    dispatch({ type: END_LOADING_DESTINATIONS});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateEvent = (id, destination) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, destination);
    dispatch({ type: UPDATE_DESTINATION, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}

export const DELETE_DESTINATION = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);
    dispatch({ type: DELETE_DESTINATION, payload: id });

  } catch (error) {
    console.log(error.message)
  }
}
export const upVoteDestination = (id) => async (dispatch) => {
  try {
    const { data } = await api.attendEvent(id);
    dispatch({ type: UPVOTE_DESTINATION, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}
export const commentDestination = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentEvent(value, id);
    dispatch({ type: COMMENT_DESTINATION, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error)
  }
}
