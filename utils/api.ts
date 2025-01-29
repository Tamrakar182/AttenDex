import axios from 'axios';
import { BASE_API } from './config-global';
import { QueryClient } from '@tanstack/react-query';

const api = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  // withCredentials: true,
});

export const queryClient = new QueryClient();

export const endpoints = {
  auth: {
    login: '/login',
    register: '/register',
    logout: '/logout',
    me: '/auth/me',
  },
  user: {
    edit: '/user/edit',
  },
  classes: {
    index: '/classes',
    details: (id: string) => `/classes/${id}`,
  },
};

export default api;
