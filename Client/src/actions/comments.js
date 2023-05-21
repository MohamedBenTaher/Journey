import * as api from '../api/index.js';
import { COMMENT_DESTINATION,UPDATE_DESTINATION_COMMENT,FETCH_DESTINATION_COMMENT,DELETE_DESTINATION_COMMENT,START_LOADING_DESTINATION_COMMENTS,END_LOADING_DESTINATION_COMMENTS } from '../constants/actionTypes.js';

//Action Creators

export const getDestinationComments = (id,entityType) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING_DESTINATION_COMMENTS })
    const { data } = await api.getEntityComments(id,entityType);
    dispatch({ type:FETCH_DESTINATION_COMMENT, payload:data});
    dispatch({type:END_LOADING_DESTINATION_COMMENTS});
  } catch (error) {
    console.log(error.message);
  }
};

export const createComment = (comment)=> async (dispatch) =>{
  try {
      const {data}=await api.commentEntity(comment);
      dispatch({type:START_LOADING_DESTINATION_COMMENTS })
      dispatch({type:COMMENT_DESTINATION,payload:data})
      dispatch({type:START_LOADING_DESTINATION_COMMENTS});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateComment=(id,comment )=> async (dispatch)=>{
    try {
      const {data}=await api.updateEntityComments(id,comment);
      dispatch({type:UPDATE_DESTINATION_COMMENT,payload:data});
      
    } catch (error) {
      console.log(error.message)
    }
    }

export const deleteComment=(id)=> async(dispatch) =>{
  try {
    await api.deleteEntityComments(id);
    dispatch({type:DELETE_DESTINATION_COMMENT,payload:id});
    
  } catch (error) {
    console.log(error.message)
  }
}