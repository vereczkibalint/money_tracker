import api from '../utils/api';

import { registerSuccessful, registerFailed } from '../actions/user/userActions';

const API_PATH = '/users';

export const register = (userData) => {
  return (dispatch) => {
    api.post(API_PATH, userData).then(response => {
      dispatch(registerSuccessful());
    }).catch(err => {
      console.log(err.response);
      const { errors } = err.response.data;
      dispatch(registerFailed(errors));
    })
  }
}