import { AUTH_SUCCESSFUL, AUTH_FAILED, AUTH_LOGOUT, USER_LOADED } from '../../actions/auth/authActionTypes';

const initialState = {
  token: null,
  user: null,
  errors: [],
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case AUTH_SUCCESSFUL:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        errors: []
      }
    case AUTH_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        errors: payload.errors
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        errors: []
      }
    case USER_LOADED:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true
      }
    default:
      return state;
  }
}

export default authReducer;