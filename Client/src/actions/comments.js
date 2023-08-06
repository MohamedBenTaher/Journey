import * as api from '../api/index';
import {
  COMMENT_DESTINATION,
  UPDATE_DESTINATION_COMMENT,
  FETCH_DESTINATION_COMMENT,
  DELETE_DESTINATION_COMMENT,
  START_LOADING_DESTINATION_COMMENTS,
  END_LOADING_DESTINATION_COMMENTS,
} from '../constants/actionTypes';

// Action Creators

export const getDestinationComments = (id, entityType) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATION_COMMENTS });
    const { data } = await api.getEntityComments(id, entityType);
    console.log('fetched comments', data);
    dispatch({ type: FETCH_DESTINATION_COMMENT, payload: data });
    dispatch({ type: END_LOADING_DESTINATION_COMMENTS });
  } catch (error) {
    console.log(error.message);
  }
};

export const createComment = (entityId, entityType, userId, content) => async (dispatch) => {
  try {
    const { data } = await api.commentEntity(entityId, entityType, userId, content);
    dispatch({ type: START_LOADING_DESTINATION_COMMENTS });
    dispatch({ type: COMMENT_DESTINATION, payload: data });
    dispatch({ type: END_LOADING_DESTINATION_COMMENTS });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMyComment = (id, userId, content) => async (dispatch) => {
  try {
    const { data } = await api.updateEntityComments(id, userId, content);
    console.log('pdated data', data);
    dispatch({ type: START_LOADING_DESTINATION_COMMENTS });
    dispatch({ type: UPDATE_DESTINATION_COMMENT, payload: data });
    dispatch({ type: END_LOADING_DESTINATION_COMMENTS });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    await api.deleteEntityComments(id);
    dispatch({ type: DELETE_DESTINATION_COMMENT, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
