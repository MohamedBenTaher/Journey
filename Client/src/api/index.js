import axios from 'axios';

// const API = axios.create({ baseURL: 'https://journeybackend.onrender.com/' });
const API = axios.create({ baseURL: 'http://localhost:5000/' });
//to be added user roles &  chat 
API.interceptors.request.use(function (config) {
  if (localStorage.getItem('profile')) {
    const user = JSON.parse(localStorage.getItem('profile'))
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});
/*===================Posts====================*/
export const fetchPost = (id) => API.get(`/post/${id}`);
export const fetchTopPosts=()=>API.get(`/post/top`)
export const fetchPosts = (page) => API.get(`/post?page=${page}`);
export const createPost = (newPost) => API.post('/post', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => API.patch(`/post/${id}/like`);
export const comment = (value, id) => API.post(`/post/${id}/comment`, { value });
export const fetchPostsByCreator = (name) => API.get(`/post/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&season=${searchQuery.season}`);
/*========================UserAuth=====================================*/
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
/*=======================EVents========================================*/
export const fetchTopEevents=()=>API.get(`/event/top`)
export const fetchEvents = (page) => API.get(`/event?page=${page}`);
export const fetchEvent = (id) => API.get(`/event/${id}`);
export const createEvent = (newEvent) => API.post('/event', newEvent);
export const updateEvent = (id, updatedEvent) => API.patch(`/event/${id}`, updatedEvent);
export const commentEvent = (value, id) => API.post(`/event/${id}/commentEvent`, { value });
export const deleteEvent = (id) => API.delete(`/event/${id}`);
export const attendEvent = (id) => API.post(`/event/${id}`)
/*===========================Destinations=========================================*/
export const fetchTopDestinations=()=>API.get(`/destination/top`)
export const fetchDestinatons = (page) => API.get(`/destination?page=${page}`);
export const fetchDestination = (id) => API.get(`/destination/${id}`);
export const createDestionation = (newDestination) => API.post('/destination', newDestination,{
  headers: {
    'Content-Type':'multipart/form-data',
}});
export const updateDestinations = (id, updatedDestination) => API.patch(`/destination/${id}`, updatedDestination,{
  headers: {
    'Content-Type':'multipart/form-data',
}});
export const deleteDestination = (id) => API.delete(`/destination/${id}`);
export const upVoteDestination = (destinationId,userId) => API.patch(`/destination/${destinationId}/upvote`,{userId:userId})
export const downVoteDestination = (destinationId,userId) => API.patch(`/destination/${destinationId}/downvote`,{userId:userId})
export const fetchDestinationsBySearch = (searchQuery) => API.get(`/destination/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&season=${searchQuery.season}`);
/*===================================Comments===============================================*/
/*==============Destination============*/
export const commentEntity = (entityId,entityType,userId,content) => API.post(`/comment/${entityId}/comment`, { body:{userId:userId,entityType:entityType,content:content} });
export const getEntityComments=(id,entityType)=>API.get(`/comment/${id}`,{ params: { entityType } })
export const updateEntityComments=(id,userId,content)=>API.patch(`/comment/${id}`,{userId:userId,content:content})
export const deleteEntityComments=(id)=>API.delete(`/comment/${id}`)


/*=====================================Images============================================*/
export const deleteS3Image=(id,url)=>API.post(`/destination/image/delete/${id}`,{url:url})

/*=====================================Country==========================*/
export const createCountry=(newCountry)=>API.post('/country',newCountry,{
  headers: {
    'Content-Type':'multipart/form-data',
}})
export const fetchCountries = (page) => API.get(`/country?page=${page}`);
export const fetchCountry= (id)=>API.get(`/country/${id}`);
export const updateCountry= (id,updatedCountry) => API.patch(`/country/${id}`,updatedCountry,{
  headers: {
    'Content-Type':'multipart/form-data',
    }});
export const deleteCountry= (id) => API.delete(`/country/${id}`);
export const fetchCountriesBySearch = (searchQuery) => API.get(`/country/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&season=${searchQuery.season}`);
export const likeCountry=(countryId,id)=>API.post(`/country/${countryId}/like`,{userId:id})
export const dislikeCountry=(countryId,id)=>API.post(`/country/${countryId}/dislike`,{userId:id})
export const fetchCountryByLikes=(id)=>API.get(`/country/likes/${id}`)
