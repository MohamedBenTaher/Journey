 import { AUTH,LOGOUT,START_LOADING_USER,END_LOADING_USER, BOOKMARK_RESOURCE,CANCEL_BOOKMARK_RESOURCE } from "../constants/actionTypes";

 export default  (state = {user:null,isLoading:false},action)=>{
    switch (action.type) {
      case START_LOADING_USER:
        return { ...state, isLoading: true };
      case END_LOADING_USER:
        return { ...state, isLoading: false }
      case AUTH:
        localStorage.setItem('profile',JSON.stringify({...action?.payload?.data}))
        console.log('reached auth')
        console.log('payload',action?.payload?.data)
          return {...state,user:{ ...action.payload.data }}
       case LOGOUT:
         localStorage.clear();
         return { ...state, user: null, loading: false, errors: null };
         case BOOKMARK_RESOURCE:
          return {
            ...state,
            user: {
              ...state.user,
              savedResources: [...state.user.savedResources, action.payload],
            },
          };
          case CANCEL_BOOKMARK_RESOURCE:
      return {
        ...state,
        user: {
          ...state.user,
          savedResources: state.user.savedResources.filter((resource) => resource.id !== action.payload.id),
        },
      };
        default:
          return state;
    }
  } 

