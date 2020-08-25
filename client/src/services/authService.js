import api from '../utils/api';

import {
  successfulAuth,
  failedAuth,
  userLoaded,
  logoutAuth,
  registerSuccessful,
  registerFailed
} from '../actions/auth/authActions';

const API_PATH = '/auth';
const REGISTER_PATH = '/users';

export const loadUser = () => {
  return (dispatch) => {
    api.get('/auth').then(response => {
      dispatch(userLoaded(response.data[0]));
      return true;
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(failedAuth(errors));
      return false;
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
          return true;
        }).catch(err => {
          const { errors } = err.response.data;
          dispatch(failedAuth(errors));
          return false;
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
    return true;
  }
}

export const register = (userData) => {
  return (dispatch) => {
    api.post(REGISTER_PATH, userData).then(response => {
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(registerSuccessful(token, user));
      dispatch(loadUser());
      return true;
    }).catch(err => {
      const { errors } = err.response.data;
      dispatch(registerFailed(errors));
      return false;
    })
  }
}