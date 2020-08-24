import { AUTH_SUCCESSFUL, AUTH_FAILED, AUTH_LOGOUT, USER_LOADED, REGISTER_SUCCESSFUL, REGISTER_FAILED } from './authActionTypes';

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

export const registerSuccessful = (token, user) => {
  return {
    type: REGISTER_SUCCESSFUL,
    payload: {
      token,
      user
    }
  }
}

export const registerFailed = (errors) => {
  return {
    type: REGISTER_FAILED,
    payload: {
      errors
    }
  }
}