import {
  AUTH,
  START_LOADING_USER,
  END_LOADING_USER,
  USER_INFROMATIONS,
  LOGOUT
} from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log('fetched data', data);
    dispatch({ type: START_LOADING_USER });
    dispatch({ type: AUTH, payload: { data } });
    // log in the user
    dispatch({ type: END_LOADING_USER });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: START_LOADING_USER });
    dispatch({ type: AUTH, payload: { data } });
    dispatch({ type: END_LOADING_USER });
    // log in the user
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
export const signOut=(history)=>{
  try {
  localStorage.removeItem('profile');
  dispatch({ type: LOGOUT });
  history.push('/')
  } catch (error) {
    console.log(error);
  }

}
export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({ type: START_LOADING_USER });
    dispatch({ type: USER_INFROMATIONS, payload: { data } });
    dispatch({ type: END_LOADING_USER });
  } catch (error) {
    console.log(error);
  }
};
