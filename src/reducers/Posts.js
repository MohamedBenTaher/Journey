
import { LIKE,UPDATE,CREATE,FETCH_ALL,DELETE ,FETCH_BY_SEARCH} from '../constants/actionTypes.js';
export default (posts = [],action)=>{
  switch (action.type) {
    case FETCH_ALL:
        return action.payload;
        
     case CREATE:
       return [...posts,action.payload];

     case UPDATE:
       return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
       
     case DELETE:
       return posts.filter((post)=> post._id !== action.payload);

      
       case LIKE:
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      

      case FETCH_BY_SEARCH:
        return action.payload;
       
      default:
        return posts;
        
  }
} 

