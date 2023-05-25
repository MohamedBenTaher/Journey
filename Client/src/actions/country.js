import * as api from '../api/index.js';
import { LIKE, UPDATE_DESTINATION, CREATE_DESTINATION, FETCH_DESTINATION_BY_SEARCH, DELETE_DESTINATION, FETCH_DESTINATIONS, START_LOADING_DESTINATIONS, END_LOADING_DESTINATIONS, FETCH_DESTINATION, COMMENT_DESTINATION, UPVOTE_DESTINATION,DOWNVOTE_DESTINATION } from '../constants/actionTypes.js';

//Action Creators
export const getTopCountries = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_DESTINATIONS })
      const { data: { data } } = await api.fetchTopDestinations();
  
      dispatch({ type: FETCH_DESTINATIONS, payload: { data } });
      dispatch({ type: END_LOADING_DESTINATIONS });
    } catch (error) {
      console.log(error.message);
    }
  };
export const getCountries = (page) => async (dispatch) => {
  try {
    console.log('called action')
    dispatch({ type: START_LOADING_DESTINATIONS })
    const { data: { data, currentPage, numberOfPages } } = await api.fetchDestinatons(page);
    console.log('actions',data)
    dispatch({ type: FETCH_DESTINATIONS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCountry = (id) => async (dispatch) => {
  try {
    
    const { data } = await api.fetchDestination(id);
    dispatch({ type: START_LOADING_DESTINATIONS })
    dispatch({ type: FETCH_DESTINATION, payload: data });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCountriesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_DESTINATIONS })
    const { data: { data } } = await api.fetchDestinationsBySearch(searchQuery);
    console.log('searchedDseyinations', data)
    dispatch({ type: FETCH_DESTINATION_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_DESTINATIONS });
  } catch (error) {
    console.log(error.message);
  }
};

export const createCountry = (destination) => async (dispatch) => {
  try {
    console.log(destination);
    const { data } = await api.createDestionation(destination);
    dispatch({ type: START_LOADING_DESTINATIONS })
    dispatch({ type: CREATE_DESTINATION, payload: [data] })
    dispatch({ type: END_LOADING_DESTINATIONS});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateCountry = (id, destination) => async (dispatch) => {
  try {
    const { data } = await api.updateDestinations(id, destination);
    dispatch({ type: UPDATE_DESTINATION, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}

export const deleteCountry = (id) => async (dispatch) => {
  try {
    await api.deleteDestination(id);
    dispatch({ type: DELETE_DESTINATION, payload: id });

  } catch (error) {
    console.log(error.message)
  }
}
export const upvoteCountry = (destinationId,userId) => async (dispatch) => {
  try {
    const { data } = await api.upVoteDestination(destinationId,userId);
    console.log('after upvote ',data)
    dispatch({ type: UPVOTE_DESTINATION, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}
export const downvoteCountry = (destinationId,userId) => async (dispatch) => {
  try {
    const { data } = await api.downVoteDestination(destinationId,userId);
    console.log('after downvote ',data)
    dispatch({ type: DOWNVOTE_DESTINATION, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}

