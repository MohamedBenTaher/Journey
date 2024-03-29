import {
  LIKE,
  UPDATE,
  CREATE,
  FETCH_ALL,
  DELETE,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_BY_CREATOR,
  CANCEL_BOOKMARK_POST,
  BOOKMARK_POST,
  FETCH_TOP_POSTS,
} from '../constants/actionTypes';

const PostReducer = (state = { isLoadingPosts: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoadingPosts: true };
    case END_LOADING:
      return { ...state, isLoadingPosts: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numrOfPages,
      };
    case FETCH_TOP_POSTS:
      return {
        ...state,
        posts: action.payload.data,
      };
    case FETCH_POST:
      return { ...state, post: action.payload };

    case FETCH_BY_CREATOR:
      return { ...state, posts: action.payload.data };
    case CREATE:
      return { ...state, posts: action.payload };

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case BOOKMARK_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case CANCEL_BOOKMARK_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? {
                ...post,
                bookmarkedBy: post.bookmarkedBy.filter(
                  (userId) => userId !== action.payload.userId,
                ),
              }
            : post,
        ),
      };
    default:
      return state;
  }
};
export default PostReducer;
