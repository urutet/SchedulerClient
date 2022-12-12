import axios from "axios";
import { json } from "react-router-dom";

export const client = axios.create({ baseURL: 'https://localhost:7112/api/auditoria/' });

client.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const getAuditoria = () => client.get('auditoria');

export const getAuditoriumTypes = () => client.get('auditoriumTypes');

export const addAuditorium = (json) => client.post('/', json, {
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const deleteAuditorium = (id) => client.delete(`${id}`);

export const editAuditorium = (id, json) => client.put(`${id}`, json, {
    headers: { 
        'Content-Type' : 'application/json'
    }
})