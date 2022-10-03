import axios from 'axios';

const API=axios.create({ baseURL: 'https://journeybackend.onrender.com',timeout: 100000 });

axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('profile')) {
    const user=JSON.parse(localStorage.getItem('profile'))
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost=(newPost)=>API.post('/posts',newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`,{value});
export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`)

export const signIn=(formData) =>API.post('/user/signin',formData)
export const signUp=(formData) =>API.post('/user/signup',formData)