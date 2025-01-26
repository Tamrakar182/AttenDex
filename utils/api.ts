import axios from 'axios';
import { BASE_API } from './config-global';
import { QueryClient } from '@tanstack/react-query';

const api = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const queryClient = new QueryClient();

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  user: {
    edit: '/user/edit',
  },
};

export default api;
