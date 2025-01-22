import axios from 'axios';

export const server = "http://127.0.0.1:8000"

export const Api = axios.create({
     baseURL: `${server}/api/`
});
