import * as api from '../api/index.js';
import { LIKE,UPDATE,CREATE,FETCH_BY_SEARCH,DELETE } from '../constants/actionTypes.js';

//Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type:FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPostsBySearch  = (searchQuery) => async (dispatch) => {
  try {
    const { data:{data} } = await api.fetchPostsBySearch(searchQuery);
    console.log(data)
   // dispatch({ type:FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post)=> async (dispatch) =>{
  try {
      const {data}=await api.createPost(post);
      dispatch({type:CREATE,payload:data})
  } catch (error) {
    console.log(error.message)
  }
}

export const updatePost=(id,post )=> async (dispatch)=>{
    try {
      const {data}=await api.updatePost(id,post);
      dispatch({type:UPDATE,payload:data});
      
    } catch (error) {
      console.log(error.message)
    }
    }

export const deletePost=(id)=> async(dispatch) =>{
  try {
    await api.deletePost(id);
    dispatch({type:DELETE,payload:id});
    
  } catch (error) {
    console.log(error.message)
  }
}
export const likePost=(id)=>async (dispatch)=>{
  try {
    const {data}=await api.likePost(id);
    dispatch({type:LIKE,payload:data});
    
  } catch (error) {
    console.log(error.message)
  }
  }