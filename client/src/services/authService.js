import api from '../utils/api';

import { successfulAuth, failedAuth, userLoaded, logoutAuth } from '../actions/auth/authActions';

const API_PATH = '/auth';

export const loadUser = () => {
  return (dispatch) => {
    api.get('/auth').then(response => {
      dispatch(userLoaded(response.data[0]));
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(failedAuth(errors));
    })
  }
}

export const login = (email, password) => {
    return (dispatch) => {
      api.post(API_PATH, { email, password }, { headers: { 'Content-Type': 'application/json' }})
        .then(response => {
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(successfulAuth(token, user));
        }).catch(err => {
          const { errors } = err.response.data;
          dispatch(failedAuth(errors));
      });
    }
}

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutAuth());
  }
}