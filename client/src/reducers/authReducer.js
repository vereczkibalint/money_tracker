import { BEGIN_LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT } from '../actions/auth/types';

const authState = {
  isLoading: false,
  error: [],
  token: null
};

export default function auth(state = authState, action) {
  switch(action.type) {
    case BEGIN_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLoading: false
      };
    default:
      return state;
  }
}