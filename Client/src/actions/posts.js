import * as api from '../api/index.js';
import {
  LIKE,
  UPDATE,
  CREATE,
  FETCH_BY_SEARCH,
  DELETE,
  FETCH_ALL,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
  FETCH_BY_CREATOR,
  BOOKMARK_POST,
  CANCEL_BOOKMARK_POST,
} from '../constants/actionTypes.js';

//Action Creators

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log('searchedPosts', data);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    console.log('called createPost');
    const { data } = await api.createPost(post);
    dispatch({ type: START_LOADING });
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, userId);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
export const bookmarkPost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.bookmarkPost(id, userId);
    console.log('after post bookmark ', data);
    dispatch({ type: BOOKMARK_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const cancelBookmarkPost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.cancelBookmarkPost(id, userId);
    console.log('after post bookmark ', data);
    dispatch({ type: CANCEL_BOOKMARK_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
