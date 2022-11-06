import * as api from '../api/index.js';
import { LIKE,UPDATE_EVENT,CREATE_EVENT,FETCH_EVENT_BY_SEARCH,DELETE_EVENT, FETCH_EVENTS,START_LOADING,END_LOADING,FETCH_EVENT,COMMENT_EVENT,ATTEND_EVENT} from '../constants/actionTypes.js';

//Action Creators

export const getEvents = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING })
    const { data: { data, currentPage, numberOfPages } } = await api.fetchEvents(page);

    dispatch({ type:FETCH_EVENTS, payload:{ data, currentPage, numberOfPages } });
    dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};
export const getEvent = (id) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING })
    const { data } = await api.fetchEvent(id);

    dispatch({ type:FETCH_EVENT, payload:data });
    dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};
export const getEventsBySearch  = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING })
    const { data:{data} } = await api.fetchPostsBySearch(searchQuery);
    console.log('searchedEvents',data)
   dispatch({ type:FETCH_EVENT_BY_SEARCH, payload:{data}});
   dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};

export const createEvent = (post)=> async (dispatch) =>{
  try {
      const {data}=await api.createPost(post);
      dispatch({type:START_LOADING })
      dispatch({type:CREATE_EVENT,payload:data})
      dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateEvent =(id,post )=> async (dispatch)=>{
    try {
      const {data}=await api.updatePost(id,post);
      dispatch({type:UPDATE_EVENT,payload:data});
      
    } catch (error) {
      console.log(error.message)
    }
    }

export const DELETE_EVENT=(id)=> async(dispatch) =>{
  try {
    await api.deleteEvent(id);
    dispatch({type:DELETE,payload:id});
    
  } catch (error) {
    console.log(error.message)
  }
}
export const attendEvent=(id)=>async (dispatch)=>{
  try {
    const {data}=await api.likePost(id);
    dispatch({type:ATTEND_EVENT,payload:data});
    
  } catch (error) {
    console.log(error.message)
  }
  }
  export const commentEvent=(value,id)=> async(dispatch)=>{
    try {
     const {data}= await api.comment(value,id);
     dispatch({type:COMMENT_EVENT,payload:data});
     return data.comments;
    } catch (error) {
      console.log(error)
    }
  }
