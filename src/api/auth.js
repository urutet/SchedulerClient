import axios from "axios";

const BASE_URL = "https://localhost:7112/api/Auth";

export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const login = (json) => client.post('/login', json, {
  headers: {
      'Content-Type' : 'application/json'
  }
});

export const register = (json) => client.post('/signup', json, {
  headers: {
      'Content-Type' : 'application/json'
  }
});

export const getUser = (id) => client.get(`/user/${id}`);
