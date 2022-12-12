import axios from "axios";
import { json } from "react-router-dom";

export const client = axios.create({ baseURL: 'https://localhost:7112/api/schedules/' });

client.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const getSchedules = () => client.get('schedules');
export const getSchedulesByGroupId = (id) => client.get(`schedules/${id}`);

export const addSchedule = (json) => client.post('/', json, {
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const deleteSchedule = (id) => client.delete(`${id}`);

export const editSchedule = (id, json) => client.put(`${id}`, json, {
    headers: { 
        'Content-Type' : 'application/json'
    }
})