import axios from 'axios';

const API=axios.create({ baseURL: 'https://journeybackend.onrender.com' });

axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('profile')) {
    const user=JSON.parse(localStorage.getItem('profile'))
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export const fetchPosts = (page) => axios.get(`/posts?page=${page}`);
export const fetchPost = (id) => axios.get(`/posts/${id}`);
export const createPost=(newPost)=>axios.post('/posts',newPost)
export const updatePost = (id, updatedPost) => axios.patch(`/posts/${id}`, updatedPost);
export const deletePost=(id)=>axios.delete(`/posts/${id}`);
export const likePost = (id) => axios.patch(`/posts/${id}/likePost`);
export const comment = (value,id) => axios.post(`/posts/${id}/commentPost`,{value});
export const fetchPostsBySearch=(searchQuery)=>axios.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`)

export const signIn=(formData) =>API.post('/user/signin',formData)
export const signUp=(formData) =>API.post('/user/signup',formData)