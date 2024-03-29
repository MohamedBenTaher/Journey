import {
  AUTH,
  LOGOUT,
  START_LOADING_USER,
  END_LOADING_USER,
  USER_INFROMATIONS,
  AUTH_CHECK,
} from '../constants/actionTypes';

const authReducer = (
  state = {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    token: localStorage.getItem('token') || null,
  },
  action,
) => {
  switch (action.type) {
    case START_LOADING_USER:
      return { ...state, isLoading: true };
    case END_LOADING_USER:
      return { ...state, isLoading: false };
    case AUTH_CHECK:
      return { ...state, isLoading: true };

    case `${AUTH_CHECK}_SUCCESS`:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload?.data }));
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        user: { ...action.payload.data },
        isLoggedIn: true,
        token: action?.payload?.data?.token,
        isLoading: false,
      };
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload?.data }));
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        user: { ...action.payload.data },
        isLoggedIn: true,
        token: action?.payload?.data?.token,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        user: null,
        loading: false,
        errors: null,
        token: null,
        isLoggedIn: false,
      };

    case USER_INFROMATIONS: {
      return {
        ...state,
        user: { ...action.payload.data },
        isLoggedIn: true,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
