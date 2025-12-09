import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/api' : 'http://localhost:5000/api' });
API.interceptors.request.use((config)=>{ const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null; if(token) config.headers.Authorization = `Bearer ${token}`; return config; });
export default API;
