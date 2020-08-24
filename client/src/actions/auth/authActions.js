import { AUTH_SUCCESSFUL, AUTH_FAILED, AUTH_LOGOUT, USER_LOADED } from './authActionTypes';

export const successfulAuth = (token, user) => {
  return {
    type: AUTH_SUCCESSFUL,
    payload: {
      token,
      user
    }
  }
}

export const failedAuth = (errors) => {
  return {
    type: AUTH_FAILED,
    payload: {
      errors
    }
  }
}

export const logoutAuth = () => {
  return {
    type: AUTH_LOGOUT
  }
}

export const userLoaded = (user) => {
  return {
    type: USER_LOADED,
    payload: {
      user
    }
  }
}