import * as actions from './types';

export const beginLogin = (credentials) => ({
  type: actions.BEGIN_LOGIN,
  payload: {
    credentials
  }
});

export const loginSuccessful = (token) => ({
  type: actions.LOGIN_SUCCESSFUL,
  payload: {
    token
  }
});

export const loginFailed = (errorMessage) => ({
  type: actions.LOGIN_FAILED,
  payload: {
    message: errorMessage
  }
});

export const logout = () => ({
  type: actions.LOGOUT
});