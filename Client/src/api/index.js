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
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&season=${searchQuery.season}`);
/*========================UserAuth=====================================*/
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
/*=======================EVents========================================*/
export const fetchEvents = (page) => API.get(`/events?page=${page}`);
export const fetchEvent = (id) => API.get(`/events/${id}`);
export const createEvent = (newEvent) => API.post('/events', newEvent);
export const updateEvent = (id, updatedEvent) => API.patch(`/events/${id}`, updatedEvent);
export const commentEvent = (value, id) => API.post(`/events/${id}/commentEvent`, { value });
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const attendEvent = (id) => API.post(`/events/${id}`)