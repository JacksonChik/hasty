import axios from 'axios';

const url = 'https://hasty-app.herokuapp.com/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);



//DOUBLE CHECK
export const deletePost = (id) => axios.delete(`${url}/${id}`)
//second parameter  of axios.delete, which is its config, is optional!