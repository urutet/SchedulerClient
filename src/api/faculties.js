import axios from "axios";
import { json } from "react-router-dom";

export const client = axios.create({ baseURL: 'https://localhost:7112/api/faculties/' });

client.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const getFaculties = () => client.get('faculties');

export const addFaculty = (json) => client.post('/', json, {
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const deleteFaculty = (id) => client.delete(`${id}`);

export const editFaculty = (id, json) => client.put(`${id}`, json, {
    headers: { 
        'Content-Type' : 'application/json'
    }
})