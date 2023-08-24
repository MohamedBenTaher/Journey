import {
  COMMENT_DESTINATION,
  UPDATE_DESTINATION_COMMENT,
  DELETE_DESTINATION_COMMENT,
  FETCH_DESTINATION_COMMENT,
  START_LOADING_DESTINATION_COMMENTS,
  END_LOADING_DESTINATION_COMMENTS,
} from '../constants/actionTypes';

 const commentReducer = (state = { isLoading: true, comments: [] }, action) => {
  switch (action.type) {
    case START_LOADING_DESTINATION_COMMENTS:
      return { ...state, isLoading: true };
    case END_LOADING_DESTINATION_COMMENTS:
      return { ...state, isLoading: false };
    case FETCH_DESTINATION_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };

    case COMMENT_DESTINATION:
      return { ...state, comments: [...state.comments, action.payload] };

    case UPDATE_DESTINATION_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => 
        comment._id === action.payload._id ? action.payload : comment,
        ),
      };
    case DELETE_DESTINATION_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== action.payload)
      };
    default:
      return state;
  }
};
export default commentReducer;