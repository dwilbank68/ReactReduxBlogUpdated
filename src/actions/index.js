export const CREATE_POST = 'CREATE_POSTS';
export const DELETE_POST = 'DELETE_POSTS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
import axios from 'axios';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=798f79d87g9';

export function createPost(values, callback){
    const request = axios
        .post(
            `${ROOT_URL}/posts${API_KEY}`,
            values
        )
        .then(() => callback());
    return {
        type: CREATE_POST,
        payload: request
    }
}

export function deletePost(id, callback){
    const request = axios
        .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(() => callback());
    return {
        type: DELETE_POST,
        payload: id
    }
}

export function fetchPost(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
    return {
        type: FETCH_POST,
        payload: request
    }
}

export function fetchPosts(){
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request
    }
}