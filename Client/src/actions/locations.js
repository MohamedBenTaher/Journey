import * as api from '../api/index.js';
import { RATE_LOCATION, UPDATE_LOCATION, CREATE_LOCATION, FETCH_LOCATION_BY_SEARCH,FETCH_LOCATION_BY_COUNTRY,FETCH_LOCATION_BY_DESTINATION, DELETE_LOCATION, FETCH_LOCATIONS, START_LOADING_LOCATIONS, END_LOADING_LOCATIONS, FETCH_LOCATION, COMMENT_LOCATION } from '../constants/actionTypes.js';

//Action Creators
export const getTopLocations = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_LOCATIONS })
      const { data: { data } } = await api.fetchTopDestinations();
  
      dispatch({ type: FETCH_LOCATIONS, payload: { data } });
      dispatch({ type: END_LOADING_LOCATIONS });
    } catch (error) {
      console.log(error.message);
    }
  };
export const getLocations = (page) => async (dispatch) => {
  try {
    console.log('called action')
    dispatch({ type: START_LOADING_LOCATIONS })
    const { data: { data, currentPage, numberOfPages } } = await api.fetchDestinatons(page);
    console.log('actions',data)
    dispatch({ type: FETCH_LOCATIONS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getLocation = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchDestination(id);
    dispatch({ type: START_LOADING_LOCATIONS })
    dispatch({ type: FETCH_LOCATION, payload: data });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLocationsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_LOCATIONS })
    const { data: { data } } = await api.fetchDestinationsBySearch(searchQuery);
    console.log('searchedDseyinations', data)
    dispatch({ type: FETCH_LOCATION_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getLocationsByCountry=(id)=>async (dispatch)=>{
  try {
    dispatch({ type: START_LOADING_LOCATIONS })
    console.log('id in action',id)
    const { data: { data } } = await api.fetchDestinationByCountry(id);
    console.log('searchedDseyinations', data)
    dispatch({ type: FETCH_LOCATION_BY_COUNTRY, payload: { data } });
    dispatch({ type: END_LOADING_LOCATIONS });
  } catch (error) {
    console.log(error.message);
  }
}

export const getLocationsByDestination=(id)=>async (dispatch)=>{
    try {
      dispatch({ type: START_LOADING_LOCATIONS })
      console.log('id in action',id)
      const { data: { data } } = await api.fetchDestinationByCountry(id);
      console.log('searchedDseyinations', data)
      dispatch({ type: FETCH_LOCATION_BY_DESTINATION, payload: { data } });
      dispatch({ type: END_LOADING_LOCATIONS });
    } catch (error) {
      console.log(error.message);
    }
  }

export const createLocation = (destination) => async (dispatch) => {
  try {
    console.log(destination);
    const { data } = await api.createDestionation(destination);
    dispatch({ type: START_LOADING_LOCATIONS })
    dispatch({ type: CREATE_LOCATION, payload: [data] })
    dispatch({ type: END_LOADING_LOCATIONS});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateLocation = (id, destination) => async (dispatch) => {
  try {
    const { data } = await api.updateDestinations(id, destination);
    dispatch({ type: UPDATE_LOCATION, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}

export const deleteLocation = (id) => async (dispatch) => {
  try {
    await api.deleteDestination(id);
    dispatch({ type: DELETE_LOCATION, payload: id });

  } catch (error) {
    console.log(error.message)
  }
}
export const rateLocationn = (locationId,userId) => async (dispatch) => {
  try {
    const { data } = await api.upVoteDestination(locationId,userId);
    console.log('after upvote ',data)
    dispatch({ type: RATE_LOCATION, payload: data });
  } catch (error) {
    console.log(error.message)
  }
}

