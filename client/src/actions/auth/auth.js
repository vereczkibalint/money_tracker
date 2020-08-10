import * as actions from './types';
import axios from 'axios';

const API_PATH = "/api/auth";
const jsonHeader = {
  'Content-Type': 'application/json'
};

export const beginLogin = () => {
  return {
    type: actions.BEGIN_LOGIN
  }
}

export const login = (credentials) => {
  return function (dispatch) {
    try {
      const { email, password } = credentials;
      axios.post(API_PATH, { email, password }, {
        headers: jsonHeader
      }).then(res => {
          dispatch(loginSuccessful(res.data.token, res.data.user));
      }).catch(err => {
        if(err.response.status === 400) {
          dispatch(loginFailed(err.response.data.errors));
        }
      });
    } catch (err) {
      dispatch(loginFailed([err.message]));
    }
  }
}

export const loginSuccessful = (token, user) => ({
  type: actions.LOGIN_SUCCESSFUL,
  payload: {
    token,
    user
  }
});

export const loginFailed = (errors) => ({
  type: actions.LOGIN_FAILED,
  payload: {
    errors
  }
});

export const logout = () => ({
  type: actions.LOGOUT
});