import { REGISTER_SUCCESSFUL, REGISTER_FAILED } from './userActionTypes';

export const registerSuccessful = () => {
  return {
    type: REGISTER_SUCCESSFUL
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