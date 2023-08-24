import {
  AUTH,
  LOGOUT,
  START_LOADING_USER,
  END_LOADING_USER,
  USER_INFROMATIONS,
} from '../constants/actionTypes';

const authReducer= (state = { user: null, isLoading: true,isLoggedIn:false,token: localStorage.getItem('profile')?.token || null, }, action) => {
  switch (action.type) {
    case START_LOADING_USER:
      return { ...state, isLoading: true };
    case END_LOADING_USER:
      return { ...state, isLoading: false };
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload?.data }));
      localStorage.setItem('token', action.payload.data.token);
      console.log('reached auth');
      console.log('payload', action?.payload?.data);
      return { ...state, user: { ...action.payload.data },isLoggedIn:true,token:action?.payload?.data?.token };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        user: null,
        loading: false,
        errors: null,
        token:null,
        isLoggedIn:false
      };

    case USER_INFROMATIONS: {
      return {
        ...state,
        user: { ...action.payload.data },
      };
    }
    default:
      return state;
  }
};
 export default authReducer;
