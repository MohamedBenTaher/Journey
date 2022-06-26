import axios from 'axios';

const API=axios.create({ baseURL: 'http://localhost:5000' });

axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('profile')) {
    const user=JSON.parse(localStorage.getItem('profile'))
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export const fetchPosts=()=>axios.get('/posts')
export const createPost=(newPost)=>axios.post('/posts',newPost)
export const updatePost = (id, updatedPost) => axios.patch(`/posts/${id}`, updatedPost);
export const deletePost=(id)=>axios.delete(`/posts/${id}`);
export const likePost = (id) => axios.patch(`/posts/${id}/likePost`);
export const fetchPostsBySearch=(searchQuery)=>axios.get(`posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags }`)

export const signIn=(formData) =>API.post('/user/signin',formData)
export const signUp=(formData) =>API.post('/user/signup',formData)