
import { LIKE,UPDATE_EVENT,CREATE_EVENT,FETCH_EVENTS,DELETE_EVENT ,FETCH_EVENT,FETCH_EVENTS_BY_SEARCH,START_LOADING,END_LOADING,COMMENT_EVENT,ATTEND_EVENT} from '../constants/actionTypes.js';
export default ( state= {isLoading:true,events:[]},action)=>{
  switch (action.type) {
    case START_LOADING:
      return {...state,isLoading:true};
      case END_LOADING:
      return {...state,isLoading:false}
    case FETCH_ALL:
        return {
          ...state,     
         posts:action.payload.data,
         currentPage:action.payload.currentPage,
         NumberOfPages:action.payload.numrOfPages,
        };
    case FETCH_POST:
          return {...state,post: action.payload};
    
      case FETCH_BY_CREATOR:
            return { ...state, posts: action.payload.data };
     case CREATE:
       return {...state,posts: action.payload};

     case UPDATE:
       return {...state,posts:state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
       
     case DELETE:
       return {...state,posts: state.posts.filter((post)=> post._id !== action.payload)};

      
     case LIKE:
      return {...state,posts:state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
      
      case LIKE:
        return {...state,posts:state.posts.map((post) => {
          if(post._id === action.payload._id) 
          {return action.payload}
         return post;
      })};
      case FETCH_BY_SEARCH:
      return {...state,posts:action.payload.data};
       
      default:
        return state;
        
  }
} 
