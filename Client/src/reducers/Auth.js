import {
  AUTH,
  LOGOUT,
  START_LOADING_USER,
  END_LOADING_USER,
  USER_INFROMATIONS,
} from '../constants/actionTypes';

const authReducer= (state = { user: null, isLoading: true,isLooggedIn:false }, action) => {
  switch (action.type) {
    case START_LOADING_USER:
      return { ...state, isLoading: true };
    case END_LOADING_USER:
      return { ...state, isLoading: false };
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload?.data }));
      console.log('reached auth');
      console.log('payload', action?.payload?.data);
      return { ...state, user: { ...action.payload.data },isLooggedIn:true };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        user: null,
        loading: false,
        errors: null,
        isLooggedIn:false
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
