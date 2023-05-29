import * as api from '../api/index.js';
import { FETCH_CONTINENT,FETCH_CONTINENTS,FETCH_CONTINENT_BY_SEARCH, START_LOADING_CONTINENTS,END_LOADING_CONTINENTS, CREATE_CONTINENT, UPDATE_CONTINENT, DELETE_CONTINENT} from '../constants/actionTypes.js';

//Action Creators
export const getTopContinents = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_CONTINENTS })
      const { data: { data } } = await api.fetchTopDestinations();
  
      dispatch({ type: FETCH_CONTINENTS, payload: { data } });
      dispatch({ type: END_LOADING_CONTINENTS });
    } catch (error) {
      console.log(error.message);
    }
  };
export const getContinents = (page) => async (dispatch) => {
  try {
    console.log('called action')
    dispatch({ type: START_LOADING_CONTINENTS })
    const { data: { data, currentPage, numberOfPages } } = await api.fetchContinents(page);
     dispatch({ type: FETCH_CONTINENTS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_CONTINENTS });
  } catch (error) {
    console.log(error.message);
  }
};
export const getContinent = (id) => async (dispatch) => {
  try {
    
    console.log('called single continent')
   
    dispatch({ type: START_LOADING_CONTINENTS })
    const { data } = await api.fetchContinent(id);
    console.log('fetched data',data)
    dispatch({ type: FETCH_CONTINENT, payload: data });
    dispatch({ type: END_LOADING_CONTINENTS });
  } catch (error) {
    console.log(error.message);
  }
};

export const getContinentsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_CONTINENTS })
    const { data: { data } } = await api.fetchCountriesBySearch(searchQuery);
    console.log('searchedCountries', data)
    dispatch({ type: FETCH_CONTINENT_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING_CONTINENTS });
  } catch (error) {
    console.log(error.message);
  }
};

export const createContinent = (destination) => async (dispatch) => {
  try {
    console.log(destination);
    const { data } = await api.createCountry(destination);
    dispatch({ type: START_LOADING_CONTINENTS })
    dispatch({ type: CREATE_CONTINENT, payload: [data] })
    dispatch({ type: END_LOADING_CONTINENTS});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateContinent = (id, destination) => async (dispatch) => {
  try {
    const { data } = await api.updateDestinations(id, destination);
    dispatch({ type: UPDATE_CONTINENT, payload: data });

  } catch (error) {
    console.log(error.message)
  }
}

export const deleteContinent = (id) => async (dispatch) => {
  try {
    await api.deleteContinent(id);
    dispatch({ type: DELETE_CONTINENT, payload: id });

  } catch (error) {
    console.log(error.message)
  }
}
// export const likeCountry = (destinationId,userId) => async (dispatch) => {
//   try {
//     const { data } = await api.likeCountry(destinationId,userId);
//     console.log('after upvote ',data)
//     dispatch({ type: LIKE_COUNTRY, payload: data });

//   } catch (error) {
//     console.log(error.message)
//   }
// }
// export const dislikeCountry = (destinationId,userId) => async (dispatch) => {
//   try {
//     const { data } = await api.dislikeCountry(destinationId,userId);
//     console.log('after downvote ',data)
//     dispatch({ type: DELETE_COUNTINENT, payload: data });

//   } catch (error) {
//     console.log(error.message)
//   }
// }

