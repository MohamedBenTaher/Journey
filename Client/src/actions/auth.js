import {
  AUTH,
  START_LOADING_USER,
  END_LOADING_USER,
  USER_INFROMATIONS,
  LOGOUT,
  AUTH_CHECK
} from '../constants/actionTypes.js';
import * as api from '../api/index.js';
import {checkTokenValidity} from '../utlis/auth.js'
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
export const authCheck=(token)=>async (dispatch)=>{
  console.log('called authcheck')
  if (token) {
    console.log('called with token')
    dispatch({ type: START_LOADING_USER });
    dispatch({ type: AUTH_CHECK });
    checkTokenValidity(token)
      .then((userData) => {
        console.log('called token valid')
        dispatch({ type: `${AUTH_CHECK}_SUCCESS`, payload: userData });
      })
      .catch(() => {
         console.log('called token failed')
         dispatch(signOut(history));
      })
      .finally(() => {
        console.log('called token ended loadinf')
        dispatch({ type: END_LOADING_USER });
      });
  } else {
     console.log('called with no token')
    dispatch({ type: 'SET_LOADING', payload: false });
  }
}
export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: START_LOADING_USER });
    dispatch({ type: AUTH, payload: { data } });
    dispatch({ type: END_LOADING_USER });
    // log in the user
    // history.push('/');
  } catch (error) {
    console.log(error);
  }
};
export const signOut=()=>async (dispatch)=>{
  try {
  dispatch({ type: LOGOUT });
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
