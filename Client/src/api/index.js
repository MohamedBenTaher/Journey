import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  url = 'http://localhost:5000';
} else {
  url = 'https://journey-api-ekgy.onrender.com';
}
const API = axios.create({ baseURL: url });
//to be added user roles &  chat
API.interceptors.request.use(function (config) {
  if (localStorage.getItem('profile')) {
    const user = JSON.parse(localStorage.getItem('profile'));
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const history = useHistory();
      console.log('loggin of client');
      history.push('/auth');
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);
/*===================Posts====================*/
export const fetchPost = (id) => API.get(`/post/${id}`);
export const fetchTopPosts = () => API.get(`/post/top`);
export const fetchPosts = (page) => API.get(`/post?page=${page}`);
export const createPost = (newPost) =>
  API.post('/post', newPost, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id, userId) => API.patch(`/post/${id}/like`, { userId: userId });
export const comment = (value, id) => API.post(`/post/${id}/comment`, { value });
export const fetchPostsByCreator = (name) => API.get(`/post/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/post/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&season=${
      searchQuery.season
    }`
  );
export const bookmarkPost = (id, userId) => API.patch(`post/${id}/bookmark`, { userId: userId });
export const cancelBookmarkPost = (id, userId) =>
  API.patch(`post/${id}/cancel`, { userId: userId });
/*========================UserAuth=====================================*/
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getUser = (id) => API.get(`/user/me/${id}`);
/*=======================EVents========================================*/
export const fetchTopEevents = () => API.get(`/event/top`);
export const fetchEvents = (page) => API.get(`/event?page=${page}`);
export const fetchEvent = (id) => API.get(`/event/${id}`);
export const createEvent = (newEvent) => API.post('/event', newEvent);
export const updateEvent = (id, updatedEvent) => API.patch(`/event/${id}`, updatedEvent);
export const commentEvent = (value, id) => API.post(`/event/${id}/commentEvent`, { value });
export const deleteEvent = (id) => API.delete(`/event/${id}`);
export const attendEvent = (id, userId) =>
  API.patch(`/event/${id}/attendance/attend`, { userId: userId });
export const cancelEvent = (id, userId) =>
  API.patch(`/event/${id}/attendance/cancel`, { userId: userId });
export const likeEvent = (id, userId) => API.patch(`/event/${id}/like`, { userId: userId });
export const bookmarkEvent = (id, userId) => API.patch(`/event/${id}/bookmark`, { userId: userId });
export const cancelBookmarkEvent = (id, userId) =>
  API.patch(`/event/${id}/cancel`, { userId: userId });

/*===========================Destinations=========================================*/
export const fetchTopDestinations = () => API.get(`/destination/top`);
export const fetchDestinatons = (page) => API.get(`/destination?page=${page}`);
export const fetchDestination = (id) => API.get(`/destination/${id}`);
export const createDestionation = (newDestination) =>
  API.post('/destination', newDestination, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const updateDestinations = (id, updatedDestination) =>
  API.patch(`/destination/${id}`, updatedDestination, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const deleteDestination = (id) => API.delete(`/destination/${id}`);
export const upVoteDestination = (destinationId, userId) =>
  API.patch(`/destination/${destinationId}/upvote`, { userId: userId });
export const downVoteDestination = (destinationId, userId) =>
  API.patch(`/destination/${destinationId}/downvote`, { userId: userId });
export const fetchDestinationsBySearch = (searchQuery) =>
  API.get(
    `/destination/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }&season=${searchQuery.season}`
  );
export const fetchDestinationByCountry = (id) => API.get(`/destination/country/${id}`);
export const likeDestination = (id, userId) =>
  API.patch(`/destination/${id}/like`, { userId: userId });
export const bookmarkDestination = (id, userId) =>
  API.patch(`destination/${id}/bookmark`, { userId: userId });
export const cancelBookmarkDestination = (id, userId) =>
  API.patch(`destination/${id}/cancel`, { userId: userId });
/*===================================Comments===============================================*/
/*==============Destination============*/
export const commentEntity = (entityId, entityType, userId, content) =>
  API.post(`/comment/${entityId}/comment`, {
    body: { userId: userId, entityType: entityType, content: content }
  });
export const getEntityComments = (id, entityType) =>
  API.get(`/comment/${id}`, { params: { entityType } });
export const updateEntityComments = (id, userId, content) =>
  API.patch(`/comment/${id}`, { userId: userId, content: content });
export const deleteEntityComments = (id) => API.delete(`/comment/${id}`);
/*=====================================Images============================================*/
export const deleteS3Image = (id, url) => API.post(`/destination/image/delete/${id}`, { url: url });
/*=====================================Country==========================*/
export const createCountry = (newCountry) =>
  API.post('/country', newCountry, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const fetchTopCountries = () => API.get(`/country/top`);
export const fetchCountries = (page) => API.get(`/country?page=${page}`);
export const fetchCountry = (id) => API.get(`/country/${id}`);
export const updateCountry = (id, updatedCountry) =>
  API.patch(`/country/${id}`, updatedCountry, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const deleteCountry = (id) => API.delete(`/country/${id}`);
export const fetchCountriesBySearch = (searchQuery) =>
  API.get(
    `/country/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&season=${
      searchQuery.season
    }`
  );
export const likeCountry = (id, userId) => API.patch(`/country/${id}/like`, { userId: userId });
export const fetchCountryByLikes = (id) => API.get(`/country/likes/${id}`);
// export const likeCountry=(countryId,id)=>API.post(`/country/${countryId}/like`,{userId:id})
// export const dislikeCountry=(countryId,id)=>API.post(`/country/${countryId}/dislike`,{userId:id})
// export const fetchCountryByLikes=(id)=>API.get(`/country/likes/${id}`)
export const bookmarkCountry = (id, userId) =>
  API.patch(`country/${id}/bookmark`, { userId: userId });
export const cancelBookmarCountry = (id, userId) =>
  API.patch(`country/${id}/cancel`, { userId: userId });
/*=====================================Continent=====================*/
export const createContinent = (newContinent) =>
  API.post('/continent', newContinent, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const fetchContinents = (page) => API.get(`/continent?page=${page}`);
export const fetchContinent = (id) => API.get(`/continent/${id}`);
export const updateContinent = (id, updatedContinent) =>
  API.patch(`/continent/${id}`, updatedContinent, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const deleteContinent = (id) => API.delete(`/continent/${id}`);
export const fetchContinentBySearch = (searchQuery) =>
  API.get(
    `/continent/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }&season=${searchQuery.season}`
  );

/*=====================================location================================*/
export const fetchTopLocations = () => API.get(`/location/top`);
export const fetchLocations = (page) => API.get(`/location?page=${page}`);
export const fetchLocation = (id) => API.get(`/location/${id}`);
export const createLocation = (newDestination) =>
  API.post('/location', newDestination, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const updateLocations = (id, updatedDestination) =>
  API.patch(`/destinalocationion/${id}`, updatedDestination, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
export const deleteLocation = (id) => API.delete(`/location/${id}`);
export const rateLocation = (locationId, userId, rating) =>
  API.patch(`/location/${locationId}/rate`, { userId: userId, rating: rating });
export const fetchLocationsBySearch = (searchQuery) =>
  API.get(
    `/location/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&season=${
      searchQuery.season
    }`
  );
export const fetchLocationsByCountry = (id) => API.get(`/location/country/${id}`);
export const fetchLocationsByDestination = (id) => API.get(`/location/destination/${id}`);
export const likeLocation = (id, userId) => API.patch(`/location/${id}/like`, { userId: userId });
export const fetchLocationsBytype = (id, type) => API.get(`/location/country/${id}/type/${type}`);
export const bookmarkLocation = (id, userId) =>
  API.patch(`location/${id}/bookmark`, { userId: userId });
export const cancelBookmarkLocation = (id, userId) =>
  API.patch(`location/${id}/cancel`, { userId: userId });
/*=============================Resources=======================*/
