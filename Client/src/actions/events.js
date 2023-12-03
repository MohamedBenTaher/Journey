import * as api from '../api/index';
import {
  UPDATE_EVENT,
  CREATE_EVENT,
  FETCH_EVENT_BY_SEARCH,
  CANCEL_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  START_LOADING_EVENTS,
  END_LOADING_EVENTS,
  FETCH_EVENT,
  COMMENT_EVENT,
  ATTEND_EVENT,
  BOOKMARK_EVENT,
  CANCEL_BOOKMARK_EVENT,
  LIKE_EVENT,
  FETCH_TOP_EVENTS,
  FETCH_EVENTS_BY_CREATOR,
} from '../constants/actionTypes';

// Action Creators

export const getEvents = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_EVENTS });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchEvents(page);

    dispatch({
      type: FETCH_EVENTS,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING_EVENTS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getTopEvents = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_EVENTS });
    const {
      data: { data },
    } = await api.fetchTopEevents();
    console.log('fetch events', data);
    dispatch({
      type: FETCH_TOP_EVENTS,
      payload: { data },
    });
    dispatch({ type: END_LOADING_EVENTS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_EVENTS });
    const { data } = await api.fetchEvent(id);

    dispatch({ type: FETCH_EVENT, payload: data });
    dispatch({ type: END_LOADING_EVENTS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getEventsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_EVENTS });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_EVENT_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_EVENTS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getEventsByCreator = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_EVENTS });
    const {
      data: { data },
    } = await api.fetchEventsByCreator(id);
    dispatch({ type: FETCH_EVENTS_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING_EVENTS });
  } catch (error) {
    console.log(error.message);
  }
};

export const createEvent = (event) => async (dispatch) => {
  try {
    const { data } = await api.createEvent(event);
    dispatch({ type: START_LOADING_EVENTS });
    dispatch({ type: CREATE_EVENT, payload: data });
    dispatch({ type: END_LOADING_EVENTS });
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

export const updateEvent = (id, event) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, event);
    dispatch({ type: UPDATE_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);
    dispatch({ type: DELETE_EVENT, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const attendEvent = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.attendEvent(id, userId);
    dispatch({ type: ATTEND_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const cancelEvent = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.cancelEvent(id, userId);
    dispatch({ type: CANCEL_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const commentEvent = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentEvent(value, id);
    dispatch({ type: COMMENT_EVENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
export const bookmarkEvent = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.bookmarkEvent(id, userId);
    dispatch({ type: BOOKMARK_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const cancelBookmarkEvent = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.cancelBookmarkEvent(id, userId);
    dispatch({ type: CANCEL_BOOKMARK_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const likeEvent = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likeEvent(id, userId);
    dispatch({ type: LIKE_EVENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
