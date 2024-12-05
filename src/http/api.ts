import axios from 'axios';
import useTokenStore from '@/store';

const api = axios.create({
    // todo: move this value to env variable.
    // baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    baseURL: "https://api-test.marginpilot.io",
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (data: { email: string; password: string }) =>
    api.post('/api/users/login', data);

export const register = async (data: { name: string; email: string; password: string }) =>
    api.post('/api/users/register', data);

export const getUsers = async () => api.get('/users');
export const getDeliveries = async () => api.get('/deliveries');
export const getOfferings = async () => {
    const response = await api.get('/offerings');
    return response.data; // Only return the actual data
  };
  
  export const getCustomers = async () => {
    const response = await api.get('/customers');
    return response.data; // Only return the actual data
  };

export const createUser = async (data: FormData) =>
    api.post('/users', data, {
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
    });
export const createCustomer = async (data: FormData) =>
    api.post('/customers', data, {
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
    });

export const createOffering = async (data: FormData) =>
    api.post('/offerings', data, {
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
    });
export const createDelivery = async (data: FormData) =>
    api.post('/deliveries', data, {
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
    });
