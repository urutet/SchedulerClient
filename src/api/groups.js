import axios from "axios";
import { json } from "react-router-dom";

export const client = axios.create({ baseURL: 'https://localhost:7112/api/groups/' });

client.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const getGroups = () => client.get('groups');

export const addGroup = (json) => client.post('/', json, {
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const deleteGroup = (id) => client.delete(`${id}`);

export const editGroup = (id, json) => client.put(`${id}`, json, {
    headers: { 
        'Content-Type' : 'application/json'
    }
})