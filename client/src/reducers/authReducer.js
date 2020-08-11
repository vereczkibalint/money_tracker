import { BEGIN_LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT } from '../actions/auth/types';

const authState = {
  isLoading: false,
  errors: [],
  isAuthenticated: false,
  currentUser: {}
};

export default function auth(state = authState, action) {
  switch(action.type) {
    case BEGIN_LOGIN:
      return {
        ...state,
        isLoading: true,
        errors: [],
        isAuthenticated: true
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
        isAuthenticated: true
      };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        currentUser: action.payload.user
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        currentUser: {}
      };
    default:
      return state;
  }
}