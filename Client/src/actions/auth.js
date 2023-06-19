
import { AUTH,START_LOADING_USER,END_LOADING_USER, BOOKMARK_RESOURCE, CANCEL_BOOKMARK_RESOURCE } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData);
        console.log('fetched data',data)
        dispatch({ type: START_LOADING_USER })
        dispatch({ type: AUTH, payload :{data} })
        //log in the user
        dispatch({ type: END_LOADING_USER });
        history.push('/ ')
    } catch (error) {
        console.log(error)
    }
}
export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, payload:{data} })
        //log in the user
        history.push('/ ')
    } catch (error) {
        console.log(error)
    }
}

export const bookmarkResource=(userId,id,resourceName)=>async(dispatch)=>{
    try {
        const {data} =await api.bookmarkResource(userId,id,resourceName)
        dispatch({type:BOOKMARK_RESOURCE,payload:{data}})
    } catch (error) {
        console.log(error)
    }
}
export const cancelBookmarkResource=(userId,id,resourceName)=>async(dispatch)=>{
    try {
        const {data} =await api.cancelBookmarkResource(userId,id,resourceName)
        dispatch({type:CANCEL_BOOKMARK_RESOURCE,payload:{data}})
    } catch (error) {
        console.log(error)
    }
}











