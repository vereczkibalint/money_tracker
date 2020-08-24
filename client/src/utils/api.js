import axios from 'axios';
import store from '../store';
import { AUTH_LOGOUT } from '../actions/auth/authActionTypes';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.data.msg === 'Hibás token!') {
      store.dispatch({ type: AUTH_LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;