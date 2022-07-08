
import { LIKE,UPDATE,CREATE,FETCH_ALL,DELETE ,FETCH_POST,FETCH_BY_SEARCH,START_LOADING,END_LOADING,COMMENT} from '../constants/actionTypes.js';
export default ( state= {isLoading:true,posts:[]},action)=>{
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

