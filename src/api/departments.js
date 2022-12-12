import axios from "axios";
import { json } from "react-router-dom";

export const client = axios.create({ baseURL: 'https://localhost:7112/api/departments/' });

client.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});


export const getDepartments = () => client.get('departments');

export const addDepartment = (json) => client.post('/', json, {
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const deleteDepartment = (id) => client.delete(`${id}`);

export const editDepartment = (id, json) => client.put(`${id}`, json, {
    headers: { 
        'Content-Type' : 'application/json'
    }
})