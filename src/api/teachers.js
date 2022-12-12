import axios from "axios";
import { json } from "react-router-dom";

export const client = axios.create({ baseURL: 'https://localhost:7112/api/teacher/' });

client.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const getTeachers = () => client.get('teachers');

export const addTeacher = (json) => client.post('/', json, {
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const deleteTeacher = (id) => client.delete(`${id}`);

export const editTeacher = (id, json) => client.put(`${id}`, json, {
    headers: { 
        'Content-Type' : 'application/json'
    }
})

export const addComment = (id, json) => client.put(`comment/${id}`, json, {
    headers: { 
        'Content-Type' : 'application/json'
    }
})