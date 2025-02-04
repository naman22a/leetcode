import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    withCredentials: true
});

export default API;
export * as auth from './auth';
export * as users from './users';
export * as problems from './problems';
